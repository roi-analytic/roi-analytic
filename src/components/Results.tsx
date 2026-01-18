import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Clock, Star, Shield, Quote } from "lucide-react";
import mudanzasLogo from "@/assets/mudanzas-express-365-logo.png";

const reviews = [
  {
    name: "Laia Morales Castellote",
    text: "Lo recomiendo mucho, el servicio es estupendo, hacen su trabajo bien hecho, son rápidos y puntuales, además son muy amables y cuidadosos con las cosas. Todo llegó en perfecto estado y la mudanza fue mucho más fácil de lo que esperaba. Sin duda volvería a contar con ellos.",
    rating: 5,
    timeAgo: "Hace 3 semanas"
  },
  {
    name: "Anna Maria SG",
    text: "Nuestra experiencia ha sido más que buena, han venido puntuales, han ido como un rayo y nos han montado todo perfecto. No esperaba que fuera todo tan rápido y que trabajaran con tanta eficiencia. Estamos muy contentos. Además son unos chicos muy majos y trabajadores, no han parado ni un solo momento. También le hicieron la mudanza a mis padres y ellos también quedaron muy satisfechos. Por todo ello, gracias. 100% recomendable.",
    rating: 5,
    timeAgo: "Hace 5 años"
  }
];

const Results = () => {
  return (
    <section id="resultados" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Casos de éxito
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Resultados que hablan
          </h2>
        </motion.div>

        {/* Success case card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative rounded-3xl bg-gradient-cta p-1">
            <div className="rounded-[22px] bg-card p-8 md:p-12">
              {/* Header with logo */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 shadow-md">
                  <img 
                    src={mudanzasLogo} 
                    alt="Mudanzas Express 365" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">Mudanzas Express 365</h3>
                  <p className="text-muted-foreground">Sector Mudanzas</p>
                </div>
              </div>

              {/* Client testimonial style */}
              <div className="relative mb-10">
                <Quote className="absolute -top-2 -left-2 w-10 h-10 text-primary/20" />
              <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed pl-8">
                  "Antes dependíamos casi solo del boca a boca. Desde que trabajamos con <span className="text-primary font-bold">ROI Analytic</span> empezamos a recibir solicitudes de clientes de forma constante todos los meses, y además son contactos que realmente quieren contratar. Para nosotros ha sido un cambio enorme."
                </blockquote>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-1">
                    -40%
                  </div>
                  <p className="text-sm text-muted-foreground">Coste por lead</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-1">
                    35-50
                  </div>
                  <p className="text-sm text-muted-foreground">Leads mensuales</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-1">
                    90
                  </div>
                  <p className="text-sm text-muted-foreground">Días implementación</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-1">
                    Alta
                  </div>
                  <p className="text-sm text-muted-foreground">Intención de compra</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Google Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          {/* Google rating header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-card">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold font-display">4.9</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">230 reseñas en Google</span>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why ROI Analytic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            ¿Por qué ROI ANALYTIC?
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Target,
              title: "100% enfocados en ROI",
              description: "Cada decisión está orientada a generar retorno sobre la inversión.",
            },
            {
              icon: Users,
              title: "Disponibilidad limitada",
              description: "Trabajamos con pocos clientes por zona para evitar competencia.",
            },
            {
              icon: Clock,
              title: "Optimización continua",
              description: "Revisión y ajuste diario de campañas para maximizar resultados.",
            },
            {
              icon: Star,
              title: "Especialización sectorial",
              description: "Conocemos las palabras clave y la intención de compra de cada sector.",
            },
            {
              icon: Shield,
              title: "Garantía de 30 días",
              description: "Si no cumplimos con lo acordado en el contrato, devolvemos el 100% del coste de gestión.",
            },
            {
              icon: TrendingUp,
              title: "Resultados medibles",
              description: "Seguimiento real de llamadas, formularios y WhatsApp.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-5 rounded-xl bg-card shadow-card"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
