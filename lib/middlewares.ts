import type { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decode } from "lib/jwt";

function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  // Allow localhost dev and any origin; adjust for production as needed
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  const acrh =
    // Next.js types the headers as IncomingHttpHeaders where keys are lower-cased
    (req.headers &&
      (req.headers["access-control-request-headers"] as string)) ||
    "Authorization, X-Requested-With, Content-Type";
  res.setHeader("Access-Control-Allow-Headers", acrh);
}

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    // If this is a CORS preflight request, reply immediately without auth
    if (req.method === "OPTIONS") {
      setCorsHeaders(req, res);
      // No content for preflight
      res.status(204).end();
      return;
    }

    // Ensure CORS headers are present on all responses (including errors)
    setCorsHeaders(req, res);

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
