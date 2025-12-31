# Proyecto de Envío de Correos con Next.js + Nodemailer

Este proyecto implementa un sistema de envío de correos electrónicos utilizando **Next.js 15.x** en el frontend y **Nodemailer** en el backend.  
Incluye validaciones de formato y campos requeridos, así como soporte para direcciones de correo en formato simple o combinado.

---

## Estructura del proyecto

```
src/
 ├── app/
 │    └── api/
 │         └── sendEmail/
 │              ├── route.ts        # Endpoint POST para envío de correos
 │              └── validator.ts    # Validaciones de los campos del request
 ├── models/
 │    └── bodySendMailRequest.model.ts  # Modelo del cuerpo de la petición
 ├── services/
 │    └── sendEmails/
 │         └── sendEmail.service.ts     # Servicio que usa Nodemailer
 └── utils/
      └── email.utils.ts                # Funciones auxiliares (ej. extractEmail)
```

Archivos raíz relevantes:
- `.env` → Variables de entorno (credenciales y configuración SMTP).
- `next.config.ts` → Configuración de Next.js.
- `package.json` → Dependencias del proyecto.

---

## Configuración inicial

1. **Clonar el repositorio**  
   ```bash
   git clone <url-del-repo>
   cd <nombre-del-proyecto>
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**  
   Crear un archivo `.env` en la raíz con las siguientes variables:

   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu-cuenta@gmail.com
   EMAIL_PASSWORD=tu-password-o-app-password
   ```

   > Importante: Gmail requiere **App Passwords** si tienes activada la verificación en dos pasos.
   > Si alguna variable de entorno (EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD) no está definida, 
   el servicio de envío fallará.

4. **Ejecutar el proyecto**  
   ```bash
   npm run dev
   ```

---

## Formato del campo `to`

El campo **`to`** admite dos formatos:

- **Texto simple (solo email):**
  ```json
  {
    "to": "destinatario@example.com"
  }
  ```

- **Texto combinado (nombre + email entre <>):**
  ```json
  {
    "to": "Juan Pérez <destinatario@example.com>"
  }
  ```

Ambos formatos son válidos y se procesan correctamente gracias a la función `extractEmail`.

---

## Validaciones implementadas

El sistema valida los siguientes campos del cuerpo (`BodySendMailRequest`):

- **from (remitente):**
  - No puede estar vacío.
  - Debe contener un email válido (ej. `remitente@example.com` o `Nombre <remitente@example.com>`).
  - Mensajes de error posibles:
    - `"El remitente es requerido."`
    - `"Formato de email de remitente incorrecto."`

- **to (destinatario):**
  - No puede estar vacío.
  - Debe contener un email válido (ej. `destinatario@example.com` o `Nombre <destinatario@example.com>`).
  - Mensajes de error posibles:
    - `"El email de destino es requerido."`
    - `"Formato de email de destino incorrecto."`

- **subject (asunto):**
  - No puede estar vacío.
  - Mensaje de error: `"El asunto es requerido."`

- **content (mensaje):**
  - No puede estar vacío.
  - Mensaje de error: `"El mensaje es requerido."`

---

## Consideraciones importantes

- El proyecto usa **Nodemailer** con servidor SMTP de Gmail.  
  Para otros proveedores, basta con cambiar `EMAIL_HOST` y `EMAIL_PORT` en `.env`.

- Nunca subas tu archivo `.env` al repositorio.  
  Asegúrate de que `.gitignore` incluya `.env`.

- Los errores de validación se devuelven al frontend con mensajes específicos, por ejemplo:
  - `"El remitente es requerido."`
  - `"Formato de email de destino incorrecto."`

- En caso de error del servidor SMTP, el mensaje de error se propaga al frontend.

---

## Ejemplo de flujo

1. Usuario completa el formulario en `page.tsx`.  
2. Se envía un `POST` a `/api/sendEmail` con el cuerpo:

   ```json
   {
     "from": "Remitente <remitente@example.com>",
     "to": "Destinatario <destinatario@example.com>",
     "subject": "Prueba de envío",
     "content": "Este es un mensaje de prueba."
   }
   ```

3. El backend valida los campos.  
4. Si todo es correcto, se envía el correo y se devuelve:

   ```json
   { "success": true, "message": "Email enviado con éxito" }
   ```

---

## Nota 
Este proyecto se basa en el código compartido por el profesor José Galdamez en el curso [Next.js framework de producción para ReactJS](https://www.udemy.com/course/next-js-framework-de-produccion-para-reactjs/). El repositorio original está disponible en [send-mails-api-next-js](https://github.com/JoseGaldamez/send-mails-api-next-js). 

He realizado pruebas y personalizaciones adicionales con fines educativos y de práctica personal.
