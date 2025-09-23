import { createSingleProductPreference } from "lib/mercadopago";
import { getProductById } from "./products";
import { Order } from "../models/orders";

export async function generateOrder(productId, userId) {
  try {
    const productData = await getProductById(productId);

    const newOrder = await Order.createOrder({
      title: productData.title,
      productId,
      amount: productData.price,
      status: "pending",
      userId,
    });

    const newOrderId = newOrder.id;

    // hacer que mercado pago reciba esto y este bien
    const newPref = await createSingleProductPreference({
      productName: productData.title,
      productDescription: productData.description,
      productId: productData.productId,
      productPrice: productData.price,
      transactionId: newOrderId,
    });
    const response = {
      orderId: newOrder.id,
      mercadoPagoURL: newPref.init_point,
    };
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getOrdersByUserId(userId) {
  try {
    const orders = await Order.getAllOrders(userId);
    console.log(orders);
    const response = orders.map((order) => ({
      id: order.id,
      title: order.data.title,
      amount: order.data.amount,
      status: order.data.status,
    }));
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getOrderById(orderId: string) {
  try {
    const order = await Order.getSingleOrder(orderId);
    return { id: order.id, ...order.data };
  } catch (err) {
    throw err;
  }
}
