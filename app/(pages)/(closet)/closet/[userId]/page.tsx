'use client';

import ClothesInfoBox from '../../../../../components/closet/closet_main/clothesInfoBox';
import AddToggleBtn from '../../../../../components/closet/closet_add/addToggleBtn';
import SelectBox from '../../../../../components/closet/closet_main/selectBox';
import styles from '../../../../../styles/closet/closet.module.scss';
import SortBox from '../../../../../components/closet/closet_main/sortBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getUserClothes,
  getUserClothesByCatMajor,
  getUserClothesByCatMiddle,
} from '../../../../../service/closetApiService';
import { RootState } from '../../../../../Store/Store';

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
function findCategory() {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    if (!queryString) return null;

    const queryParams = queryString.split('&');

    for (const param of queryParams) {
      if (param.startsWith('category=')) {
        const category = param.split('=')[1];
        return decodeURIComponent(category);
      }
    }
  }

  return null;
}
export default function Closet({ params: { userId } }) {
  const sortStatus = useSelector((state: any) => state.status.status);
  // console.log('sort 상태', sortStatus);
  const getUserId = useSelector((state: RootState) => state.user.userId);
  // console.log('userId > ', userId);
  const selectMajorData = useSelector((state: any) => state.search.selectMajor);
  const selectMiddleData = useSelector(
    (state: any) => state.search.selectMiddle
  );

  // console.log('검색분류 (중) >>', selectMajorData);
  // console.log('검색분류 (소) >>', selectMiddleData);

  const [userClothesData, setUserClothesData] = useState<clothes[]>([]);
  //
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useEffect(() => {
    const category = findCategory();
    if (category) {
      setSelectedCategory(category);
    }
  }, []);
  // 전체
  useEffect(() => {
    const userClothesData = async () => {
      try {
        const userClothesData = await getUserClothes();
        setUserClothesData(userClothesData);
      } catch (error) {
        console.log(error, '유저 옷장 데이터 가져오기 오류 (전체) ');
      }
    };
    userClothesData();
  }, []);

  // 중분류 카테고리
  useEffect(() => {
    const fetchUserClothesData = async () => {
      try {
        let clothesData;
        if (selectMajorData !== '') {
          clothesData = await getUserClothesByCatMajor(selectMajorData);
        } else {
          clothesData = await getUserClothes();
        }

        // 카테고리 필터링
        if (selectedCategory) {
          clothesData = clothesData.filter(
            (item) => item.middleCategory === selectedCategory
          );
        }

        setUserClothesData(clothesData);
      } catch (error) {
        console.log(error, '유저 옷장 데이터 가져오기 오류');
      }
    };

    fetchUserClothesData();
  }, [selectMajorData, selectedCategory]);

  // 소분류 카테고리
  useEffect(() => {
    const userClothesData = async () => {
      if (selectMajorData !== '') {
        try {
          const userClothesDataByCat = await getUserClothesByCatMiddle(
            selectMiddleData
          );
          setUserClothesData(userClothesDataByCat);
        } catch (error) {
          console.log(error, '유저 옷장 데이터 가져오기 오류 (소분류)');
        }
      }
    };
    userClothesData();
  }, [selectMiddleData]);

  console.log(userClothesData);

  return (
    <div className={styles.container}>
      <div className={styles.innerHeader}>
        <p>
          <span>{getUserId}</span>님의 옷장
        </p>
        <div>
          <button>
            <span className="material-symbols-outlined">bookmark</span>
          </button>
          <span>50</span>
        </div>
      </div>
      <div className={styles.selectBox}>
        <SelectBox />
      </div>
      <div className={styles.sortBox}>
        <SortBox />
      </div>
      <div
        className={
          sortStatus ? styles.mainInfoBoxDefault : styles.mainInfoBoxSmall
        }
      >
        {userClothesData.length == 0 && (
          <div className={styles.noResultBox}>
            <span>옷 정보가 없습니다.</span>
            <span>새로운 옷을 등록해주세요!</span>
          </div>
        )}
        {userClothesData.map((clothes) => (
          <ClothesInfoBox key={clothes.id} clothes={clothes} />
        ))}
      </div>
      <AddToggleBtn />
    </div>
  );
}
