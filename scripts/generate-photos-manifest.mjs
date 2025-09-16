import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Tente d'utiliser un binaire ffmpeg embarqué si disponible
let ffmpegPath = null;
try {
  const mod = await import("ffmpeg-static");
  ffmpegPath = mod?.default || null;
} catch {
  // ffmpeg-static non installé, on essaiera le ffmpeg du système
}

const root = path.resolve(process.cwd());
const photosDir = path.join(root, "public", "photos");
const manifestPath = path.join(photosDir, "manifest.json");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"]);
const VIDEO_EXTS = new Set([".mp4", ".m4v", ".mov", ".webm"]);

const THUMB_WIDTH = 320;
const LARGE_WIDTH = 1600;

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      const nested = await walk(full);
      out.push(...nested);
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function classify(file) {
  const ext = path.extname(file).toLowerCase();
  if (IMAGE_EXTS.has(ext)) return "image";
  if (VIDEO_EXTS.has(ext)) return "video";
  return null;
}

async function main() {
  const files = await walk(photosDir);
  const outputs = [];

  await fs.mkdir(path.join(photosDir, "optimized"), { recursive: true });
  await fs.mkdir(path.join(photosDir, "optimized", "thumbs"), {
    recursive: true,
  });
  await fs.mkdir(path.join(photosDir, "optimized", "large"), {
    recursive: true,
  });
  await fs.mkdir(path.join(photosDir, "optimized", "posters"), {
    recursive: true,
  });
  await fs.mkdir(path.join(photosDir, "optimized", "videos"), {
    recursive: true,
  });
  await fs.mkdir(path.join(photosDir, "optimized", "videos", "light"), {
    recursive: true,
  });

  const ffmpegCmd = ffmpegPath || "ffmpeg";
  const ffmpegAvailable = await new Promise((resolve) => {
    execFile(ffmpegCmd, ["-version"], (err) => resolve(!err));
  });

  const optimizedDir = path.join(photosDir, "optimized");
  for (const f of files) {
    if (f.startsWith(optimizedDir + path.sep)) continue;
    if (/\.(zip|heic)$/i.test(f)) continue;
    const type = classify(f);
    if (!type) continue;

    const relName = path.relative(photosDir, f).split(path.sep).join("/");
    const baseName = path.basename(relName, path.extname(relName));

    if (type === "image") {
      const image = sharp(f);
      const meta = await image.metadata();

      const thumbOut = path.join(
        photosDir,
        "optimized",
        "thumbs",
        `${baseName}.webp`
      );
      const largeOut = path.join(
        photosDir,
        "optimized",
        "large",
        `${baseName}.webp`
      );

      await image
        .clone()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(thumbOut);

      await image
        .clone()
        .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(largeOut);

      outputs.push({
        type: "image",
        src:
          "/" +
          path.posix.join("photos", "optimized", "large", `${baseName}.webp`),
        thumb:
          "/" +
          path.posix.join("photos", "optimized", "thumbs", `${baseName}.webp`),
        width: meta.width || null,
        height: meta.height || null,
      });
    } else if (type === "video") {
      let poster = "/placeholder.svg";
      let thumb = "/placeholder.svg";
      if (ffmpegAvailable) {
        const posterOut = path.join(
          photosDir,
          "optimized",
          "posters",
          `${baseName}.webp`
        );
        const thumbOut = path.join(
          photosDir,
          "optimized",
          "thumbs",
          `${baseName}-poster.webp`
        );
        try {
          await new Promise((resolve, reject) => {
            execFile(
              ffmpegCmd,
              [
                "-y",
                "-i",
                f,
                "-ss",
                "00:00:01",
                "-vframes",
                "1",
                "-vf",
                `scale=${LARGE_WIDTH}:-2:flags=lanczos`,
                posterOut,
              ],
              (err) => (err ? reject(err) : resolve())
            );
          });
          await new Promise((resolve, reject) => {
            execFile(
              ffmpegCmd,
              [
                "-y",
                "-i",
                f,
                "-ss",
                "00:00:01",
                "-vframes",
                "1",
                "-vf",
                `scale=${THUMB_WIDTH}:-2:flags=lanczos`,
                thumbOut,
              ],
              (err) => (err ? reject(err) : resolve())
            );
          });
          poster =
            "/" +
            path.posix.join(
              "photos",
              "optimized",
              "posters",
              `${baseName}.webp`
            );
          thumb =
            "/" +
            path.posix.join(
              "photos",
              "optimized",
              "thumbs",
              `${baseName}-poster.webp`
            );
        } catch {
          // ignore ffmpeg errors
        }
      }
      // Conversion vidéo: produit deux versions (HD et Light) si ffmpeg est dispo
      let optimizedSrc = "/" + path.posix.join("photos", relName);
      let lightSrc = null;
      if (ffmpegAvailable) {
        const videoOut = path.join(
          photosDir,
          "optimized",
          "videos",
          `${baseName}.mp4`
        );
        const lightOut = path.join(
          photosDir,
          "optimized",
          "videos",
          "light",
          `${baseName}.mp4`
        );
        try {
          // Version HD (qualité raisonnable, H.264 + AAC)
          await new Promise((resolve, reject) => {
            execFile(
              ffmpegCmd,
              [
                "-y",
                "-i",
                f,
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-profile:v",
                "high",
                "-preset",
                "medium",
                "-crf",
                "23",
                "-movflags",
                "+faststart",
                // Supprime toute piste audio
                "-an",
                videoOut,
              ],
              (err) => (err ? reject(err) : resolve())
            );
          });

          // Version light (résolution réduite et CRF plus élevé)
          await new Promise((resolve, reject) => {
            execFile(
              ffmpegCmd,
              [
                "-y",
                "-i",
                f,
                "-vf",
                "scale=960:-2:flags=lanczos",
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-profile:v",
                "main",
                "-preset",
                "faster",
                "-crf",
                "28",
                "-movflags",
                "+faststart",
                // Supprime toute piste audio
                "-an",
                lightOut,
              ],
              (err) => (err ? reject(err) : resolve())
            );
          });
          optimizedSrc =
            "/" +
            path.posix.join("photos", "optimized", "videos", `${baseName}.mp4`);
          lightSrc =
            "/" +
            path.posix.join(
              "photos",
              "optimized",
              "videos",
              "light",
              `${baseName}.mp4`
            );
        } catch {
          // Conversion échouée; on garde les sources originales
        }
      }

      outputs.push({
        type: "video",
        src: optimizedSrc,
        light: lightSrc,
        original: "/" + path.posix.join("photos", relName),
        poster,
        thumb,
      });
    }
  }

  await fs.writeFile(manifestPath, JSON.stringify(outputs, null, 2), "utf8");
  console.log(
    `Wrote manifest with ${outputs.length} items -> ${path.relative(
      root,
      manifestPath
    )}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
