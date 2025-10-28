import type { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decode } from "lib/jwt";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseBearerToken(req);
    if (!token) {
      res.status(401).send({ message: "NO token" });
      return;
    }
    const decoded = decode(token);

    if (decoded) {
      callback(req, res, decoded);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
}
