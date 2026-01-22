import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Shield,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/roianalytic-info/nueva-reunion";

const Contact = () => {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-cta opacity-5" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-cta flex items-center justify-center mx-auto mb-6"
          >
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Hablamos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Sesión inicial de 10 minutos para valorar si encaja con tu negocio.
            Sin compromiso ni coste.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Calendly Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">
                    Reserva una llamada
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    30 min · Sin compromiso
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Agenda una sesión gratuita de 30 minutos para conocer tu negocio
                y valorar si podemos ayudarte a conseguir más clientes con
                Google Ads.
              </p>

              <Button variant="hero" size="lg" className="w-full mb-8" asChild>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar sesión gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <div className="space-y-4 pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground">
                  ¿Qué incluye la sesión?
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Análisis rápido de tu situación actual
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Valoración del potencial de Google Ads para tu negocio
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Propuesta personalizada si encajamos
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-6"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Garantía 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Sin compromiso</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
