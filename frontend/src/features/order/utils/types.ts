export interface Price {
  amount: number;
  currency: string;
}

export interface OrderItem {
  title: string;
  productId: string;
  variantId?: string;
  quantity: number;
  images: {
    url: string;
  }[];
  description: string;
  price: Price;
}

export interface Order {
  _id: string;
  status: "pending" | "paid" | "failed";
  orderStatus: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  estimatedDelivery?: string;
  price: Price;
  razorpay: {
    orderId?: string;
    paymentId?: string;
    signature?: string;
  };
  user: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AllOrderResponse {
  success: boolean;
  message: string;
  orders: Order[];
}

export interface SingleOrderResponse {
  success: boolean;
  message: string;
  order: Order;
}
