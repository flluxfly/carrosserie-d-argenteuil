import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Informations légales concernant le site de la Carrosserie
              d'Argenteuil
            </p>
          </div>
        </section>

        {/* Legal Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Identification */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    1. Identification de l'entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <strong className="text-foreground">
                      Dénomination sociale :
                    </strong>
                    <p className="text-muted-foreground">
                      SARL CARROSSERIE D'ARGENTEUIL
                    </p>
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Forme juridique :
                    </strong>
                    <p className="text-muted-foreground">SARL</p>
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Adresse du siège social :
                    </strong>
                    <p className="text-muted-foreground">
                      1 rue Guy Môquet
                      <br />
                      95100 Argenteuil, France
                    </p>
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Numéro de téléphone :
                    </strong>
                    <p className="text-muted-foreground">
                      <a href="tel:0621769591" className="hover:underline">
                        06 21 76 95 91
                      </a>
                    </p>
                  </div>
                  <div>
                    <strong className="text-foreground">Adresse email :</strong>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:carrosseriedargenteuil@gmail.com"
                        className="hover:underline"
                      >
                        carrosseriedargenteuil@gmail.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <strong className="text-foreground">SIRET :</strong>
                    <p className="text-muted-foreground">892 560 269 00011</p>
                  </div>
                  <div>
                    <strong className="text-foreground">
                      Numéro de TVA intracommunautaire :
                    </strong>
                    <p className="text-muted-foreground">FR87892560269</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hébergement */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    2. Hébergement du site
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Le site internet est hébergé par Lovable Dev Limited,
                    société de droit anglais.
                  </p>
                </CardContent>
              </Card>

              {/* Propriété intellectuelle */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    3. Propriété intellectuelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    L'ensemble de ce site relève de la législation française et
                    internationale sur le droit d'auteur et la propriété
                    intellectuelle. Tous les droits de reproduction sont
                    réservés, y compris pour les documents téléchargeables et
                    les représentations iconographiques et photographiques.
                  </p>
                  <p className="text-muted-foreground">
                    La reproduction de tout ou partie de ce site sur un support
                    électronique quel qu'il soit est formellement interdite sauf
                    autorisation expresse de la Carrosserie d'Argenteuil.
                  </p>
                </CardContent>
              </Card>

              {/* Données personnelles */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    4. Protection des données personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Conformément à la loi "Informatique et Libertés" du 6
                    janvier 1978 modifiée et au Règlement Général sur la
                    Protection des Données (RGPD), vous disposez d'un droit
                    d'accès, de rectification, de portabilité et d'effacement de
                    vos données.
                  </p>
                  <p className="text-muted-foreground">
                    Les informations recueillies via le formulaire de contact
                    sont destinées à la Carrosserie d'Argenteuil pour le
                    traitement de vos demandes. Elles ne sont en aucun cas
                    cédées à des tiers.
                  </p>
                  <p className="text-muted-foreground">
                    Pour exercer ces droits, vous pouvez nous contacter à
                    l'adresse : carrosseriedargenteuil@gmail.com
                  </p>
                </CardContent>
              </Card>

              {/* Cookies */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    5. Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ce site utilise des cookies techniques nécessaires au bon
                    fonctionnement du site. Ces cookies ne collectent aucune
                    donnée personnelle et ne nécessitent pas de consentement.
                  </p>
                </CardContent>
              </Card>

              {/* Responsabilité */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    6. Limitation de responsabilité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Les informations contenues sur ce site sont aussi précises
                    que possible et le site est périodiquement remis à jour,
                    mais peut toutefois contenir des inexactitudes, des
                    omissions ou des lacunes.
                  </p>
                  <p className="text-muted-foreground">
                    Si vous constatez une lacune, erreur ou ce qui paraît être
                    un dysfonctionnement, merci de bien vouloir le signaler par
                    email à : contact@carrosserie-argenteuil.fr
                  </p>
                </CardContent>
              </Card>

              {/* Droit applicable */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    7. Droit applicable et juridiction compétente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tout litige en relation avec l'utilisation de ce site est
                    soumis au droit français. Il est fait attribution exclusive
                    de juridiction aux tribunaux compétents de Paris.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
