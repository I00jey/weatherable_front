import dynamic from 'next/dynamic';

const MypageClient = dynamic(() => import('../../../components/MyPage/MypageClient'), {
  ssr: false
});

export default function MypagePage() {
  return <MypageClient />;
}
