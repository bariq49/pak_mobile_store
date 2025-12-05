import { Metadata } from 'next';
import OrderConfirmationContent from './order-confirmation-content';

export const metadata: Metadata = {
  title: 'Order',
};

export default async function Order() {
  return <OrderConfirmationContent />;
}
