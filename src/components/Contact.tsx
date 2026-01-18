import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Shield, MessageCircle, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CALENDLY_URL = "https://calendly.com/roianalytic"; // User needs to update this

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`Consulta de ${formData.name} - ROI Analytic`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.phone}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    window.location.href = `mailto:roianalytic@hotmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "¡Formulario enviado!",
      description: "Se abrirá tu cliente de correo para enviar el mensaje.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display text-xl font-bold mb-6">Envíanos un mensaje</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-background resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>

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
                  <h3 className="font-display text-xl font-bold">Reserva una llamada</h3>
                  <p className="text-sm text-muted-foreground">10 min · Sin compromiso</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Agenda una sesión gratuita de 10 minutos para conocer tu negocio y 
                valorar si podemos ayudarte a conseguir más clientes con Google Ads.
              </p>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full mb-8"
                asChild
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-5 h-5" />
                  Agendar sesión gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <div className="space-y-4 pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground">¿Qué incluye la sesión?</p>
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
