import { Car, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-lg font-bold">
                Carrosserie d'Argenteuil
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Experts en carrosserie automobile depuis plus de 20 ans. Nous
              redonnons vie à votre véhicule avec passion et savoir-faire.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Réparation carrosserie</li>
              <li>Peinture automobile</li>
              <li>Débosselage</li>
              <li>Remise en état après sinistre</li>
              <li>Expertise et devis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>1 rue Guy Môquet, 95100 Argenteuil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:0663904846" className="hover:underline">
                  06 63 90 48 46
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:carrosseriedargenteuil@gmail.com"
                  className="hover:underline"
                >
                  carrosseriedargenteuil@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-accent" />
                <div>
                  <div>Lun - Ven: 9h00 - 13h00 / 14h00 - 18h00</div>
                  <div>Samedi: 9h00 - 13h00 / 14h00 - 17h00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
            <p>© 2024 Carrosserie d'Argenteuil. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/mentions-legales"
                className="hover:text-accent transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
