import dynamic from 'next/dynamic';

const MypageClient = dynamic(() => import('../../../components/mypage/mypageClient'), {
  ssr: false
});

export default function MypagePage() {
  return <MypageClient />;
}
