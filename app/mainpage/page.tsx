'use client';

import LocationWeather from './MapPage';
import Mainpage_button from '../../components/mainpage/Mainpage_button';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hideBackButton } from '../../Store/mainSlice/mainPageSlice';
import { useDispatch } from 'react-redux';
import MoveLoginModal from '../../components/MoveLoginModal';
import Loading from '../../components/Loading';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
    dispatch(hideBackButton());
  }, [dispatch]);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <div className={styles.all}>
      <hr />
      <div className={styles.maincontainer}>
        <div className={styles.test}>
          <LocationWeather />
        </div>

        <div className={styles.mainbuttoncontainer}>
          <Mainpage_button />
        </div>
      </div>
      <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
    </div>
  );
};

export default MainPage;
