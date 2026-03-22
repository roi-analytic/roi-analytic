import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";

const OurStory = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-card border border-border/50 shadow-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-cta flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {t("ourStory.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {t("ourStory.description")}
                </p>

                {/* Guarantee badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl bg-accent border-2 border-primary/20 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-1">
                        {t("ourStory.guarantee.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("ourStory.guarantee.description")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
