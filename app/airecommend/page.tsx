import dynamic from 'next/dynamic';

const AiRecommendNoSSR = dynamic(() => import('../../components/AiRecommendComponent'), {
  ssr: false,
});

export default AiRecommendNoSSR;
