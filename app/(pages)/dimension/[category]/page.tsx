'use client';

import dynamic from "next/dynamic";

// dynamic import: SSR(false) 설정
const DimensionCategoryNoSSR = dynamic(() => import('./DimensionCategory'), {
  ssr: false,
});

export default function Page(props: any) {
  return <DimensionCategoryNoSSR {...props} />;
}