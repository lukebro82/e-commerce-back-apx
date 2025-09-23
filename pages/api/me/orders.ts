import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "lib/middlewares";
import { getOrdersByUserId } from "controllers/orders";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const userId = token.userId;
      const orders = await getOrdersByUserId(userId);

      res.send({ res: orders });
    } catch (err) {
      res.status(400).send({ error_message: err });
    }
  },
});

export default authMiddleware(handler);
