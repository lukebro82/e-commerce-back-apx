import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/users";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";

const handler = methods({
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const address = req.body.address;
    const user = new User(token.userId);
    await user.pull();

    user.data = { ...user.data, address: address };
    await user.push();
    res.send({ message: user.data });
  },
});

export default authMiddleware(handler);
