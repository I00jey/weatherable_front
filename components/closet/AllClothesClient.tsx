'use client';

import styles from '../../addclothes.module.scss';
import SelectBoxCrawling from '../closet/all_clothes/selectBoxCrawling';
import ClothesInfoBoxCrawling from '../closet/all_clothes/clothesInfoBoxCrawling';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCrawlingClothes,
    searchClothesGet,
} from '../../service/closetApiService';
import React, { Suspense } from 'react';
import {
    selectMajorCraw,
    selectMiddleCraw,
} from '../../Store/closetSlice/selectDataCrawlingSlice';
import Loading from '../Loading';

export default function AllClothesClient() {
    const [searchData, setSearchData] = useState('');
    const [crawClothes, setCrawClothes] = useState([]);
    const [allCrawClothes, setAllCrawClothes] = useState([]);

    const selectMajorDataCraw = useSelector(
        (state: any) => state.searchCrawling.selectMajorCraw
    );
    const selectMiddleDataCraw = useSelector(
        (state: any) => state.searchCrawling.selectMiddleCraw
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(selectMajorCraw({ value: '' }));
        dispatch(selectMiddleCraw({ value: '' }));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (selectMajorDataCraw !== '') {
                    if (selectMiddleDataCraw !== '') {
                        const filtered = allCrawClothes.filter(
                            (clothes) => clothes.middleCategory === selectMiddleDataCraw
                        );
                        setCrawClothes(filtered.slice(0, 20));
                    } else {
                        const filtered = allCrawClothes.filter(
                            (clothes) => clothes.majorCategory === selectMajorDataCraw
                        );
                        setCrawClothes(filtered.slice(0, 20));
                    }
                } else {
                    data = await getCrawlingClothes();
                    setCrawClothes(data.slice(0, 20));
                    setAllCrawClothes(data);
                }
            } catch (error) {
                console.log(error, '크롤링 데이터 가져오기 오류');
            }
        };

        fetchData();
    }, [selectMajorDataCraw, selectMiddleDataCraw]);

    const searchClothes = async (e: any) => {
        e.preventDefault();
        if (searchData === '') {
            const crawlingClothes = await getCrawlingClothes();
            setCrawClothes(crawlingClothes.slice(0, 20));
        } else {
            const searchResult = await searchClothesGet(searchData);
            setCrawClothes(searchResult);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchInputBox}>
                <form onSubmit={searchClothes}>
                    <label htmlFor="search">
                        <span className="material-symbols-outlined">search</span>
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="검색어를 입력해주세요"
                        onChange={(e) => setSearchData(e.target.value)}
                    />
                </form>
            </div>
            <div className={styles.selectBox}>
                <SelectBoxCrawling />
            </div>
            <div className={styles.mainInfoBoxDefault}>
                {crawClothes.map((clothes, index) => (
                    <Suspense fallback={<Loading />} key={clothes.id}>
                        <ClothesInfoBoxCrawling data={clothes} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
}
