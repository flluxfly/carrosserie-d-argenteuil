import heroImage from "@/assets/hero-garage.jpg";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  CheckCircle,
  Clock,
  Palette,
  Phone,
  Shield,
  Star,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      icon: Car,
      title: "Carrosserie",
      description:
        "Réparation complète de carrosserie après accident ou sinistre",
      features: ["Débosselage", "Remise en forme", "Soudure"],
    },
    {
      icon: Palette,
      title: "Peinture",
      description:
        "Peinture automobile professionnelle avec finitions de qualité",
      features: ["Peinture métallisée", "Vernis", "Retouches"],
    },
    {
      icon: Wrench,
      title: "Expertise",
      description: "Diagnostic et expertise pour assurance et particuliers",
      features: ["Devis gratuit", "Expertise rapide", "Conseil personnalisé"],
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Garantie Qualité",
      description:
        "Tous nos travaux sont garantis 2 ans pièces et main d'œuvre",
    },
    {
      icon: Clock,
      title: "Intervention Rapide",
      description: "Devis sous 24h et intervention dans les meilleurs délais",
    },
    {
      icon: Star,
      title: "20 ans d'Expérience",
      description: "Une expertise reconnue dans la réparation automobile",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            {/* Overlay plus sombre pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Ajout d'un dégradé en bas pour le contraste des CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-shadow-strong">
              Carrosserie d'Argenteuil
              <span className="block text-accent text-4xl md:text-6xl">
                Réparation & Peinture automobile
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 text-shadow">
              Carrosserie à Argenteuil (95100): débosselage, peinture, remise en
              état après sinistre. Devis gratuit et intervention rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="automotive" size="lg" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Devis Gratuit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/accomplissements">Voir Nos Réalisations</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Nos Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                De la simple rayure au sinistre complet, nous maîtrisons toutes
                les techniques de réparation pour redonner à votre véhicule son
                aspect d'origine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-navy rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Pourquoi Nous Choisir ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Votre satisfaction est notre priorité. Découvrez les avantages
                qui font notre réputation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                    <advantage.icon className="h-10 w-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-navy text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  500+
                </div>
                <div className="text-primary-foreground/80">
                  Véhicules Réparés
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  20+
                </div>
                <div className="text-primary-foreground/80">
                  Années d'Expérience
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  100%
                </div>
                <div className="text-primary-foreground/80">
                  Clients Satisfaits
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  24h
                </div>
                <div className="text-primary-foreground/80">Délai de Devis</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-elegant bg-gradient-metallic">
              <CardContent className="text-center py-16 px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-6">
                  Votre Véhicule Mérite le Meilleur
                </h2>
                <p className="text-lg text-secondary-dark/80 mb-8 max-w-2xl mx-auto">
                  Confiez-nous la réparation de votre véhicule. Devis gratuit et
                  personnalisé sous 24h. Contactez-nous dès maintenant !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="automotive" size="lg" asChild>
                    <Link to="/contact">
                      <Phone className="mr-2 h-5 w-5" />
                      06 63 90 48 46
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-secondary-dark text-secondary-dark hover:bg-secondary-dark hover:text-primary-foreground"
                    asChild
                  >
                    <Link to="/accomplissements">Voir Nos Réalisations</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
