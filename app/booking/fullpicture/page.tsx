'use client';

import { redirect } from 'next/navigation';

// This step has been removed from the booking flow
export default function FullPicturePage() {
  redirect('/booking/contact');
}
