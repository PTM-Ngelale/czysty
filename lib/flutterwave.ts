// Types for the Flutterwave Standard inline checkout script
// (loaded via <Script src="https://checkout.flutterwave.com/v3.js">)

export type FlutterwaveCustomer = {
  email: string;
  phone_number?: string;
  name?: string;
};

export type FlutterwaveCustomizations = {
  title: string;
  description?: string;
  logo?: string;
};

export type FlutterwaveCallbackResponse = {
  status: string;
  transaction_id: number;
  tx_ref: string;
  amount: number;
  currency: string;
};

export type FlutterwaveConfig = {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options?: string;
  customer: FlutterwaveCustomer;
  customizations?: FlutterwaveCustomizations;
  callback: (response: FlutterwaveCallbackResponse) => void;
  onclose: () => void;
};

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: FlutterwaveConfig) => void;
  }
}
