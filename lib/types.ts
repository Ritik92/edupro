export interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    created_at: number;
  }
  
  export interface RazorpayPayment {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }