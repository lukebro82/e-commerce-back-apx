import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function sendMail(email, code) {
  try {
    console.log("hola");
    const respuesta = await resend.emails.send({
      from: `Ecommerce-app <onboarding@resend.dev>`,
      to: ["lucas.82@hotmail.com.ar"], //acá iría el email
      subject: "Login Code",
      html: `Tu código de acceso es:  ${code}`,
    });
    console.log(respuesta);
  } catch (error) {
    throw error;
  }
}
