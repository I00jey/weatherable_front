'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/closet/addform.module.scss';
import SelectCat from './selectBoxes/selectCat';
import SelectSize from './selectBoxes/selectSize';
import SelectColor from './selectBoxes/selectColor';
import SelectThickness from './selectBoxes/selectThickness';
import SelectWeather from './selectBoxes/selectWeather';
import SelectStyles from './selectBoxes/selectStyles';
import SelectImg from './selectBoxes/selectImg';
import SelectName from './selectBoxes/selectName';
import SelectBrand from './selectBoxes/selectBrand';
import SelectPrice from './selectBoxes/selectPrice';

import { postAddClothes } from '../../../service/closetApiService';

export default function AddForm() {
  interface TotalData {
    image: string;
    productName: string;
    brand: string;
    majorCategory: string;
    middleCategory: string;
    size: string;
    season: string;
    thickness: string;
    style: string;
    price: string;
  }

  const totalData: TotalData = useSelector((state: any) => ({
    image: state.clothes.clothes.small_img,
    productName: state.clothes.clothes.product_name,
    brand: state.clothes.clothes.brand,
    majorCategory: state.clothes.clothes.major_category,
    middleCategory: state.clothes.clothes.middle_category,
    size: state.clothes.clothes.size,
    season: state.clothes.clothes.weather,
    thickness: state.clothes.clothes.thickness,
    style: state.clothes.clothes.style,
    price: state.clothes.clothes.price,
  }));

  const addClothes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postAddClothes(totalData);
      console.log('post 완료');
      console.log(totalData);
    } catch (error) {
      console.error('실패: ', error);
    }
  };

  return (
    <form action="" className={styles.addFormContainer} onSubmit={addClothes}>
      <div className={styles.imgBox}>
        <SelectImg />
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="productName">제품명</label>
        <SelectName />
        <label htmlFor="brand">브랜드</label>
        <SelectBrand />
        <label htmlFor="">카테고리</label>
        <SelectCat />
        <label htmlFor="">사이즈</label>
        <SelectSize />
        <label htmlFor="">계절</label>
        <SelectWeather />
        <label htmlFor="">두께</label>
        <SelectThickness />
        <label htmlFor="">스타일</label>
        <SelectStyles />
        <label htmlFor="">구매가격</label>
        <SelectPrice />
      </div>
      <div className={styles.btnBox}>
        <button className={styles.submit}>저장하기</button>
        <button className={styles.temSubmit}>임시저장하기</button>
      </div>
    </form>
  );
}
