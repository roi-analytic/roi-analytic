import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logo from "@/assets/logo-roi-analytic.png";

const Header = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const base = lang ? `/${lang}` : "";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { labelKey: "nav.sectors", id: "sectores" },
    { labelKey: "nav.whyRoi", id: "why-roi-analytic" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between md:h-20">
        <motion.a
          href={`${base}#`}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logo} alt="ROI Analytic" className="h-10 md:h-12 w-auto" />
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              {t(item.labelKey)}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="hero"
            size="sm"
            onClick={() => scrollToSection("contacto")}
          >
            {t("nav.contact")}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
