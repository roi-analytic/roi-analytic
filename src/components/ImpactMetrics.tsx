import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, Euro, Target, TrendingDown } from "lucide-react";

const metrics = [
  { icon: Calendar, valueKey: "impact.metrics.years.value", descKey: "impact.metrics.years.description" },
  { icon: Euro, valueKey: "impact.metrics.revenue.value", descKey: "impact.metrics.revenue.description" },
  { icon: Target, valueKey: "impact.metrics.roas.value", descKey: "impact.metrics.roas.description" },
  { icon: TrendingDown, valueKey: "impact.metrics.leadCost.value", descKey: "impact.metrics.leadCost.description" },
];

const ImpactMetrics = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            {t("impact.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("impact.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 md:p-8 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-3xl md:text-4xl font-bold font-display text-foreground mb-2">
                {t(metric.valueKey)}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(metric.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
