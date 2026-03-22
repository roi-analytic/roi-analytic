import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLocale } from "@/i18n";

const localeToHreflang: Record<SupportedLocale, string> = {
  es: "es",
  en: "en",
  nl: "nl",
};

const ID_CANONICAL = "i18n-canonical";
const ID_HREFLANG_PREFIX = "i18n-hreflang-";

export const SeoHead = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language as SupportedLocale;

  useEffect(() => {
    if (!document.documentElement) return;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const title = t("meta.title");
    const description = t("meta.description");
    const ogTitle = t("meta.ogTitle");
    const ogDescription = t("meta.ogDescription");

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute("content", ogTitle);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute("content", ogDescription);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", lang === "en" ? "en_GB" : lang === "nl" ? "nl_NL" : "es_ES");
    }
  }, [lang, t]);

  useEffect(() => {
    const base = window.location.origin;
    const pathWithoutLang = window.location.pathname.replace(/^\/(es|en|nl)(\/|$)/, "/") || "/";

    let canonical = document.getElementById(ID_CANONICAL) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.id = ID_CANONICAL;
      document.head.appendChild(canonical);
    }
    canonical.href = `${base}/${lang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

    (["es", "en", "nl"] as const).forEach((l) => {
      const id = `${ID_HREFLANG_PREFIX}${l}`;
      let link = document.getElementById(id) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "alternate";
        link.id = id;
        document.head.appendChild(link);
      }
      link.hreflang = localeToHreflang[l];
      link.href = `${base}/${l}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
    });
  }, [lang]);

  return null;
}
