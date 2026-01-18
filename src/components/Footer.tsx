import { motion } from "framer-motion";
import logo from "@/assets/logo-roi-analytic.png";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 border-t border-border bg-muted/20"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="ROI ANALYTIC" className="h-10 w-auto" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © 2026 ROI ANALYTIC. Publicidad digital enfocada en resultados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
