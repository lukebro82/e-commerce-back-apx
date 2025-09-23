import type { NextApiRequest, NextApiResponse } from "next";
import { findOrCreateAuth, sendCode } from "../../../controllers/auth";
import { sendMail } from "../../../controllers/resendMail";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  try {
    const auth = await findOrCreateAuth(email);
    await sendCode(email);
    await auth.pull();
    const code = auth.data.code;
    await sendMail(email, code);
    res.status(200).send({ auth });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
