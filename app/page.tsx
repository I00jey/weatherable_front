'use client'

import dynamic from 'next/dynamic';

const MainPageClient = dynamic(() => import('../components/mainpage/MainPageClient'), {
  ssr: false
});

export default function MainPage() {
  return <MainPageClient />;
}
