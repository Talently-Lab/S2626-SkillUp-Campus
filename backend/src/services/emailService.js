const nodemailer = require('nodemailer');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function crearTransporter() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

/**
 * Envía el correo de bienvenida tras completar el registro de un usuario.
 * Si no hay credenciales SMTP configuradas, omite el envío sin fallar.
 */
async function enviarCorreoBienvenida({ nombre, email }) {
  const transporter = crearTransporter();
  if (!transporter) {
    console.warn('[email] Faltan EMAIL_USER o EMAIL_PASS; se omitió el correo de bienvenida.');
    return { sent: false, reason: 'MISSING_CREDENTIALS' };
  }

  const from = process.env.EMAIL_FROM?.trim() || `SkillUp Campus <${process.env.EMAIL_USER.trim()}>`;
  const nombreSeguro = escapeHtml(nombre);

  const info = await transporter.sendMail({
    from,
    to: email,
    subject: '¡Bienvenido/a a SkillUp Campus!',
    text: `¡Hola, ${nombre}!\n\nTu cuenta en SkillUp Campus fue creada con éxito.\nYa podés explorar el catálogo de cursos, inscribirte y seguir tu progreso desde tu panel personal.\n\n¡Éxitos en tu aprendizaje!\nEquipo de SkillUp Campus`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 560px; margin: 0 auto; line-height: 1.5;">
        <h2 style="color: #2563eb;">¡Bienvenido/a a SkillUp Campus, ${nombreSeguro}!</h2>
        <p>Tu cuenta fue creada con éxito.</p>
        <p>Ya podés iniciar sesión para explorar el catálogo de cursos, inscribirte y seguir tus clases desde tu panel personal.</p>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">¡Éxitos en tu aprendizaje!<br/>Equipo de SkillUp Campus</p>
      </div>
    `,
  });

  return { sent: true, messageId: info.messageId };
}

module.exports = { enviarCorreoBienvenida };
