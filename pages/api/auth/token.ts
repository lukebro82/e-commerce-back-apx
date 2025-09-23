import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "models/auth";
import { generate } from "../../../lib/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, codeFront } = req.body;

  const auth = await Auth.findByEmail(email);

  const { code, expires, userId } = auth.data;

  if (codeFront !== code) {
    res.status(401).send({ error: "Código incorrecto" });
    return;
  }

  const now = new Date();
  const expiresDate = new Date(expires);

  if (expiresDate.getTime() < now.getTime()) {
    res.status(401).send({ error: "Código expirado" });
    return;
  }

  const token = generate({ userId });

  res.status(200).send({ token });
}
