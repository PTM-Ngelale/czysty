import { redirect } from 'next/navigation';

// Staff matching step removed per product spec — go straight to checkout
export default function MatchingPage() {
  redirect('/booking/checkout');
}
