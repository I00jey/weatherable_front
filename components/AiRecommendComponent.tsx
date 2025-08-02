'use client';

import { useEffect, useState, useRef } from 'react';
import {
    getUserClothes,
    aiRecommendPost,
} from '../service/closetApiService';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from '../styles/closet/aiRecommend.module.scss'
import Link from 'next/link';
import MoveLoginModal from './MoveLoginModal';
import { WeatherCheckModal } from './weatherCheckModal';

interface clothes {
    brand: string;
    color: string | null;
    createdAt: string;
    id: number;
    imagePath: string;
    liked: boolean;
    majorCategory: string;
    middleCategory: string;
    nickname: string;
    price: number;
    productName: string;
    score: number;
    season: string;
    size: string;
    style: string;
    thickness: string;
    user_id: number;
    userid: string;
}

export default function AiRecommendComponent() {
    const router = useRouter();

    const [isUserData, setIsUserData] = useState<clothes[]>([]);
    const [isAiData, setIsAiData] = useState<any>('');
    const [isRecommend, setIsRecommend] = useState<any>('');

    const [isOuter, setIsOuter] = useState<any[]>([]);
    const [isTop, setIsTop] = useState<any[]>([]);
    const [isPants, setIsPants] = useState<any[]>([]);
    const [isShoes, setIsShoes] = useState<any[]>([]);
    const [isAccessory, setIsAccessory] = useState<any[]>([]);

    const weatherData = useSelector((state: any) => ({
        temp: state.aiRecommend.weather.temp,
        weather: state.aiRecommend.weather.weather,
    }));

    const transformedData: any = {
        weather: [weatherData.temp, weatherData.weather],
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weatherModal, setWeatherModal] = useState(false);

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        router.push('/login');
    };

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
            setIsModalOpen(true);
        } else if (weatherData.weather === '') {
            setWeatherModal(true);
        }

        const fetchData = async () => {
            try {
                const userClothData = await getUserClothes();
                setIsUserData(userClothData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const groupByData = (isUserData: clothes[]) => {
            return isUserData.reduce((groups: any, item: clothes) => {
                let category: string = '';
                switch (item.majorCategory) {
                    case 'Top':
                    case 'Outer':
                    case 'Shoes':
                        category = item.majorCategory;
                        break;
                    case 'Pants':
                    case 'Skirt':
                    case 'Onepiece':
                        category = 'Bottom';
                        break;
                    case 'Accessory':
                        category = 'Hat';
                        break;
                }
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push([item.productName, item.middleCategory]);
                return groups;
            }, {});
        };
        const newGroup = groupByData(isUserData);
        for (const category in newGroup) {
            transformedData[category] = newGroup[category];
        }
        setIsAiData(transformedData);
    }, [isUserData]);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const aiRecommendBtn = async () => {
        const button = buttonRef.current;
        const disabledClassName = `${styles.refreshBtnDisabled}`;
        if (button && !button.classList.contains(disabledClassName)) {
            button.classList.add(disabledClassName);

            try {
                const userClothData = await aiRecommendPost(isAiData);
                setIsRecommend(userClothData);

                const groupByMajorCategory = (recommendData: any) => {
                    const groups: any = {};
                    recommendData.forEach((item: any) => {
                        const { majorCategory } = item;
                        if (!groups[majorCategory]) {
                            groups[majorCategory] = [];
                        }
                        groups[majorCategory].push(item);
                    });
                    return groups;
                };
                const groupedData = groupByMajorCategory(userClothData);

                setIsAccessory(groupedData['Accessory'] || []);
                setIsTop(groupedData['Top'] || []);
                setIsPants(groupedData['Pants'] || []);
                setIsOuter(groupedData['Outer'] || []);
                setIsShoes(groupedData['Shoes'] || []);
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                button.classList.remove(disabledClassName);
            }, 5000);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <button ref={buttonRef} onClick={aiRecommendBtn} className={styles.refreshBtn}>
                    AI 옷 추천 받기
                </button>

                <div className={styles.mainContainer}>
                    <span className={styles.descText}>
                        버튼을 눌러 AI 추천 코디를 받아보세요!
                    </span>
                    <img
                        src="https://weatherable.s3.ap-northeast-2.amazonaws.com/default_ai.png"
                        alt=""
                    />
                    <div className={styles.outerBox}>
                        <span className="material-symbols-outlined">add_circle</span>
                        <Link href={isOuter.length > 0 ? `/clothes/${isOuter[0].id}` : ''}>
                            {isOuter.length > 0 && isOuter[0].imagePath && (
                                <img src={isOuter[0].imagePath} alt="" />
                            )}
                        </Link>
                    </div>
                    <div className={styles.topBox}>
                        <span className="material-symbols-outlined">add_circle</span>
                        <Link href={isTop.length > 0 ? `/clothes/${isTop[0].id}` : ''}>
                            {isTop.length > 0 && isTop[0].imagePath && (
                                <img src={isTop[0].imagePath} alt="" />
                            )}
                        </Link>
                    </div>
                    <div className={styles.pantsBox}>
                        <span className="material-symbols-outlined">add_circle</span>
                        <Link href={isPants.length > 0 ? `/clothes/${isPants[0].id}` : ''}>
                            {isPants.length > 0 && isPants[0].imagePath && (
                                <img src={isPants[0].imagePath} alt="" />
                            )}
                        </Link>
                    </div>
                    <div className={styles.shoesBox}>
                        <span className="material-symbols-outlined">add_circle</span>
                        <Link href={isShoes.length > 0 ? `/clothes/${isShoes[0].id}` : ''}>
                            {isShoes.length > 0 && isShoes[0].imagePath && (
                                <img src={isShoes[0].imagePath} alt="" />
                            )}
                        </Link>
                    </div>
                    <div className={styles.accessoryBox}>
                        <span className="material-symbols-outlined">add_circle</span>
                        <Link href={isAccessory.length > 0 ? `/clothes/${isAccessory[0].id}` : ''}>
                            {isAccessory.length > 0 && isAccessory[0].imagePath && (
                                <img src={isAccessory[0].imagePath} alt="" />
                            )}
                        </Link>
                    </div>
                </div>
            </div>
            <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
            <WeatherCheckModal isOpen={weatherModal} />
        </>
    );
}
