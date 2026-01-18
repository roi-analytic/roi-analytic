import { motion } from "framer-motion";
import { Stethoscope, Truck, CheckCircle2 } from "lucide-react";

const sectors = [
  {
    icon: Stethoscope,
    title: "Clínicas Dentales",
    subtitle: "Especialistas en captación de pacientes de alto valor",
    description: "Diseñamos campañas de Google Ads enfocadas en tratamientos de alta rentabilidad. Captamos pacientes con intención real de contratar servicios premium.",
    features: [
      "Campañas para implantes dentales y ortodoncia",
      "Segmentación geográfica precisa por clínica",
      "Landing pages optimizadas para conversión",
      "Seguimiento de llamadas y formularios"
    ],
    treatments: ["Implantes", "Invisalign", "Estética dental", "Ortodoncia", "Blanqueamiento"],
    gradient: "from-blue-500/20 to-primary/10"
  },
  {
    icon: Truck,
    title: "Empresas de Mudanzas",
    subtitle: "Generación de leads cualificados listos para contratar",
    description: "Captamos clientes que buscan activamente servicios de mudanzas. Leads con alta intención de compra que se convierten en presupuestos cerrados.",
    features: [
      "Llamadas directas de clientes interesados",
      "Cobertura por zonas geográficas específicas",
      "Campañas para mudanzas locales y nacionales",
      "Optimización continua del coste por lead"
    ],
    treatments: ["Mudanzas locales", "Mudanzas nacionales", "Mudanzas urgentes", "Oficinas", "Guardamuebles"],
    gradient: "from-secondary/20 to-green-500/10"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Sectors = () => {
  return (
    <section id="sectores" className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Sectores
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Especialización por industria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nos especializamos en sectores donde Google Ads genera mayor impacto. 
            Conocemos las palabras clave y la intención de compra de cada uno.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {sectors.map((sector) => (
            <motion.div
              key={sector.title}
              variants={cardVariants}
              className="group"
            >
              <div className={`h-full rounded-3xl bg-gradient-to-br ${sector.gradient} p-1`}>
                <div className="h-full rounded-[22px] bg-card p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0"
                    >
                      <sector.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-1">{sector.title}</h3>
                      <p className="text-muted-foreground">{sector.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {sector.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Treatments tags */}
                  <div className="pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">
                      Servicios que promocionamos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sector.treatments.map((treatment) => (
                        <span
                          key={treatment}
                          className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-medium"
                        >
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Exclusividad por zona:</span>{" "}
            Trabajamos con un número limitado de clientes para evitar competencia directa.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;
