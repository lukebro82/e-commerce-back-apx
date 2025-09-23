import Jwt from "jsonwebtoken";

export function generate(obj) {
  return Jwt.sign(obj, process.env.JWT_SECRET);
}

export function decode(token) {
  try {
    return Jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
