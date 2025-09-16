import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Car, Clock, Mail, MapPin, Palette, Phone, Wrench } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const services = [
    {
      icon: Car,
      title: "Carrosserie",
      description: "Réparation et remise en état de la carrosserie",
    },
    {
      icon: Palette,
      title: "Peinture",
      description: "Peinture automobile et retouches",
    },
    {
      icon: Wrench,
      title: "Débosselage",
      description: "Débosselage sans peinture (PDR)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
              Besoin d'un devis ? Une question sur nos services ? Notre équipe
              est à votre disposition pour vous accompagner.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Demandez votre Devis Gratuit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service souhaité</Label>
                        <select
                          id="service"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                        >
                          <option value="">Sélectionnez un service</option>
                          <option value="carrosserie">
                            Réparation carrosserie
                          </option>
                          <option value="peinture">Peinture automobile</option>
                          <option value="debosselage">Débosselage</option>
                          <option value="expertise">Expertise et devis</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Votre message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Décrivez votre demande, les dommages, le type de véhicule..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="automotive"
                      className="w-full"
                    >
                      Envoyer ma Demande
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Nos Coordonnées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Adresse
                        </h4>
                        <p className="text-muted-foreground">
                          Carrosserie D’Argenteuil
                          <br />
                          1 rue Guy Môquet
                          <br />
                          95100 Argenteuil
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Téléphone
                        </h4>
                        <p className="text-muted-foreground">
                          <a href="tel:0663904846" className="hover:underline">
                            06 63 90 48 46
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground">
                          <a
                            href="mailto:Carrosseriedargenteuil@gmail.com"
                            className="hover:underline"
                          >
                            Carrosseriedargenteuil@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          Horaires
                        </h4>
                        <div className="text-muted-foreground space-y-1">
                          <p>Lundi au vendredi: 9h00 - 13h00 / 14h00 - 18h00</p>
                          <p>Samedi: 9h00 - 13h00 / 14h00 - 17h00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Nos Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50"
                        >
                          <service.icon className="h-8 w-8 text-accent" />
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {service.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
