import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Navigation from "@/components/Navigation";

const Accomplissements = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nos Réalisations
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
              Parcourez nos photos et vidéos. Cliquez pour afficher en plein
              écran et naviguez de gauche à droite.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Galerie
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Photos JPEG et vidéos M4V actuellement dans le dossier
                public/photos.
              </p>
            </div>

            <Gallery />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accomplissements;
