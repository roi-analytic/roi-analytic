import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle,
  Send,
  Clock,
  Shield,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { PHONE_COUNTRIES, PHONE_COUNTRY_CODES } from "@/lib/phoneCountries";
import { cn } from "@/lib/utils";

const SECTOR_KEYS = ["jewelry", "hotels", "gyms", "ecommerce", "construction", "moving", "clinics", "other"] as const;

const createContactSchema = (t: (key: string) => string) =>
  z
    .object({
      company: z.string().min(1, t("contact.validation.required")),
      email: z
        .string()
        .min(1, t("contact.validation.required"))
        .email(t("contact.validation.invalidEmail")),
      countryCode: z.enum(PHONE_COUNTRY_CODES as unknown as [string, ...string[]], {
        required_error: t("contact.validation.required"),
      }),
      phone: z.string().min(1, t("contact.validation.required")),
      sector: z.enum(SECTOR_KEYS, {
        required_error: t("contact.validation.required"),
      }),
      message: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const trimmed = data.phone?.trim() ?? "";
      if (!trimmed) return;
      const parsed = parsePhoneNumberFromString(trimmed, data.countryCode as CountryCode);
      if (!parsed || !parsed.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("contact.validation.invalidPhone"),
          path: ["phone"],
        });
      }
    });

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

const defaultCountryCode = "ES";

const Contact = () => {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => createContactSchema(t), [t, i18n.language]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      email: "",
      countryCode: defaultCountryCode,
      phone: "",
      sector: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const trimmed = data.phone.trim();
    const parsed = parsePhoneNumberFromString(trimmed, data.countryCode as CountryCode);
    const fullPhone = parsed?.formatInternational() ?? `${data.countryCode} ${trimmed}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: data.company,
          email: data.email,
          phone: fullPhone,
          sector: data.sector,
          message: data.message ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error ?? t("contact.form.error"));
      }
      toast.success(t("contact.form.success"));
      form.reset({
        company: "",
        email: "",
        countryCode: defaultCountryCode,
        phone: "",
        sector: undefined,
        message: "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("contact.form.error"));
    }
  };

  return (
    <section id="contacto" className="section-padding relative overflow-hidden">
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
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.company")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("contact.form.companyPlaceholder")}
                            maxLength={100}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.email")}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("contact.form.emailPlaceholder")}
                            maxLength={255}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel>{t("contact.form.phone")}</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem className="mt-0 shrink-0 w-[120px]">
                          <FormControl>
                            <select
                              {...field}
                              className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                form.formState.errors.phone && "border-destructive"
                              )}
                              aria-label={t("contact.form.countryPlaceholder")}
                            >
                              {PHONE_COUNTRIES.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.flag} {country.dialCode}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="mt-0 flex-1 min-w-0">
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              autoComplete="tel-national"
                              placeholder={t("contact.form.phonePlaceholder")}
                              className={cn(
                                "flex-1 min-w-0",
                                form.formState.errors.phone && "border-destructive"
                              )}
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.value.replace(/\D/g, "").slice(0, 15))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.sector")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("contact.form.sectorPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTOR_KEYS.map((key) => (
                            <SelectItem key={key} value={key}>
                              {t(`contact.sectors.${key}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("contact.form.messagePlaceholder")}
                          rows={4}
                          maxLength={1000}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="hero"
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("contact.form.submitSending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </Button>
              </form>
            </Form>
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
              <span>{t("contact.trust.response")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>{t("contact.trust.guarantee")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{t("contact.trust.noCommitment")}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
