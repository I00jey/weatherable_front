import dynamic from 'next/dynamic';

const MypageClient = dynamic(() => import('../../../components/mypage/MypageClient'), {
  ssr: false
});

export default function MypagePage() {
  return <MypageClient />;
}
