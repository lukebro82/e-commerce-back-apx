import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/users";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const user = new User(token.userId);
    await user.pull();
    res.send(user.data);
  },
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const user = new User(token.userId);
    await user.pull();

    user.data = { ...user.data, ...req.body };
    await user.push();
    res.send({ message: user.data });
  },
});

export default authMiddleware(handler);
