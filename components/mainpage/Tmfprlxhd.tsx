import React from 'react';
import Link from 'next/link';
import styles from '../../styles/mainpage/mainpage.module.scss';

export default function Mainpagebutton({
  temperature,
}: {
  temperature: number;
}) {
  return (
    <>
      <div className={styles.mainpage__TopButton}>
        {/* 온도에 따라 다른 카테고리에 대한 링크 생성 */}

        {/* 아우터 */}

        {temperature < 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Jacket' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature < 5 && (
          <Link href={{ pathname: '../closet/1', query: { category: 'Coat' } }}>
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature < 10 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Blazer' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature < 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Mustang' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature < 7 && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Sport_Jacket' },
            }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature < -5 && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Padded_jacket' },
            }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {/* 아우터 끝 */}
        {temperature > 10 && temperature <= 15 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Shirt' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {temperature > 0 && temperature <= 5 && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Hoodies}></div>
          </Link>
        )}
        {/* 다른 
        온도 범위에 따른 링크 생성 */}
        {temperature > 10 && temperature <= 20 && null}
        {temperature > 20 && null}
      </div>
      <div className={styles.mainpage__BottomButton}>{/* 다른 버튼들 */}</div>
    </>
  );
}
