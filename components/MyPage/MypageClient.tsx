'use client';

import { useEffect, useState } from 'react';
import MypageHeader from './mypageHeader';
import styles from '../../styles/mypage/mypage.module.scss';
import PersonalInfo from './PersonalInfo';
import Dimension from './Dimension';
import Statistics from './Statistics';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MoveLoginModal from '../MoveLoginModal';

function MypageClient() {
    const [selectedComponent, setSelectedComponent] = useState('기본정보');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            setIsModalOpen(true);
        }
    }, []);

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        router.push('/login');
    };

    return (
        <div className={styles.mypage_Container}>
            <MypageHeader />
            <div className={styles.mypage_underbar}></div>
            <div className={styles.mypage_components}>
                <div
                    className={`${styles.mypage_components_info} ${selectedComponent === '기본정보' ? styles.changedComponent : ''
                        }`}
                    onClick={() => setSelectedComponent('기본정보')}
                >
                    Info
                </div>
                <div
                    className={`${styles.mypage_components_info} ${selectedComponent === '치수' ? styles.changedComponent : ''
                        }`}
                    onClick={() => setSelectedComponent('치수')}
                >
                    <Image src="/ruler.png" alt="Ruler" width={32} height={32} />
                </div>
                <div
                    className={`${styles.mypage_components_info} ${selectedComponent === '통계' ? styles.changedComponent : ''
                        }`}
                    onClick={() => setSelectedComponent('통계')}
                >
                    Report
                </div>
            </div>
            {selectedComponent === '기본정보' && <PersonalInfo />}
            {selectedComponent === '치수' && <Dimension />}
            {selectedComponent === '통계' && <Statistics />}
            <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
        </div>
    );
}

export default MypageClient;
