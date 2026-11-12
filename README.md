# Ricky Multiservicios

Landing de Ricky Multiservicios construida con Next.js a partir del diseño de Stitch.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

El formulario envía una solicitud a `POST /api/contact` para validación en servidor.

## Asistente de la web

El chat lee `recursos/info-ricky-multiservicios.md` desde el servidor y consulta OpenRouter. Configura `OPENROUTER_API_KEY` en `.env.local` y, si quieres usar otro modelo, `OPENROUTER_MODEL`. El modelo predeterminado es `anthropic/claude-haiku-5.5`. No subas credenciales a GitHub. Reinicia el servidor tras cambiar las variables.

El chat limita a 10 mensajes por sesión y 100 intentos totales por cada 24 horas en cada proceso del servidor. Estas cifras son una protección básica: se reinician al reiniciar el proceso, no se comparten entre instancias y una persona puede borrar su cookie. Antes de publicar, configura límites de gasto en OpenRouter y un limitador compartido y persistente en el proveedor de alojamiento. El chat no guarda datos de contacto ni crea solicitudes; el visitante debe usar el formulario.
