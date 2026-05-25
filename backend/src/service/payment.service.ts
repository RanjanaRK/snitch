import Razorpay from "razorpay";
import env from "../config/env.js";

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async ({
  amount,
  currency = "INR",
}: {
  amount: number;
  currency: string;
}) => {
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
  };

  const order = await razorpay.orders.create(options);

  return order;
};
