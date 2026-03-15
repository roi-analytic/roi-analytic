# Enviar emails con Resend (Vercel)

El proyecto está preparado para **un solo despliegue en Vercel**. No hay servidor aparte: el endpoint de contacto es una **Vercel Serverless Function** en `api/contact.ts`.

---

## Cómo funciona

- **Frontend** (Vite): se construye con `npm run build` y Vercel sirve la carpeta `dist/`.
- **API**: la carpeta `api/` se convierte en funciones serverless. `api/contact.ts` queda disponible en **`/api/contact`**.
- El formulario de contacto hace **POST a `/api/contact`** (mismo dominio en Vercel).
- El **API key de Resend** solo se usa en la función serverless (variables de entorno en Vercel), nunca en el frontend.

---

## Qué tienes que hacer

### 1. Variables de entorno en Vercel

En el proyecto de Vercel: **Settings → Environment Variables**. Añade:

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | Tu API key de Resend (obligatoria). |
| `CONTACT_TO_EMAIL` | Email donde recibir los contactos (ej. `roianalytic@hotmail.com`). Por defecto en código: ese mismo. |
| `RESEND_FROM_EMAIL` | Opcional. Remitente del email. Por defecto: `onboarding@resend.dev` (dominio de prueba de Resend). En producción puedes verificar tu dominio en [Resend → Domains](https://resend.com/domains) y usar p. ej. `contacto@tudominio.com`. |

### 2. Despliegue

- Conecta el repo a Vercel y despliega. Un solo proyecto: Vercel construye el frontend y expone las funciones de `api/` en el mismo dominio.
- No hace falta desplegar ningún servidor aparte.

### 3. Probar en local (formulario + envío de email)

Con **Vercel CLI** puedes ejecutar frontend y API en local:

```bash
npx vercel dev
```

Eso levanta el frontend y la función `/api/contact`. Rellena el formulario y verifica que el email llegue a `CONTACT_TO_EMAIL`.

Si solo ejecutas `npm run dev` (Vite), el formulario seguirá llamando a `/api/contact`, pero esa ruta no existirá en local y verás error al enviar. Para probar el envío real en local, usa `vercel dev`.

---

## Resumen de archivos

| Qué | Dónde |
|-----|--------|
| API key y config | Variables de entorno en Vercel (y opcionalmente `.env` para `vercel dev`) |
| Endpoint de contacto | `api/contact.ts` (Serverless Function) |
| Configuración Vercel | `vercel.json` (build, output, rewrites SPA) |
| Formulario | `src/components/Contact.tsx` → POST a `/api/contact` |

---

## Resend: dominio y remitente

- **Pruebas:** puedes usar `onboarding@resend.dev` como remitente (dominio de prueba de Resend).
- **Producción:** en [Resend → Domains](https://resend.com/domains) verifica tu dominio y configura un remitente tipo `contacto@tudominio.com`.
- El **destinatario** (`CONTACT_TO_EMAIL`) puede ser cualquier email; no tiene que estar en un dominio verificado en Resend.
