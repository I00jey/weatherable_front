import Link from 'next/link';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useSelector } from 'react-redux';

export default function Mainpagebutton() {
  const weatherData = useSelector((state: any) => ({
    temp: state.aiRecommend.weather.temp,
    weather: state.aiRecommend.weather.weather,
  }));

  // 온도에 따라 추천할 카테고리를 결정하는 함수
  const recommendCategory = (temp: number) => {
    if (temp >= 20) return 'Short_T_shirt';
    else if (temp >= 15) return 'Shirt';
    else if (temp >= 10) return 'Long_T_shirt';
    else if (temp >= 5) return 'Hoodies';
    else if (temp >= 0) return 'Sweat_shirt';
    else return 'Sweater';
  };

  const topCategory = recommendCategory(weatherData.temp);
  const bottomCategory = recommendBottomCategory(weatherData.temp);
  const outerCategory = recommendOuterCategory(weatherData.temp);

  function recommendBottomCategory(temp: number) {
    if (temp >= 20) return 'Short_pants';
    else if (temp >= 15) return 'Sport_pants';
    else if (temp >= 10) return 'Slacks';
    else return 'Denim';
  }

  function recommendOuterCategory(temp: number) {
    if (temp >= 17) return '';
    else if (temp >= 15) return 'Sport_Jacket';
    else if (temp >= 10) return 'Blazer';
    else if (temp >= 5) return 'Jacket';
    else if (temp >= 3) return 'Mustang';
    else if (temp >= 0) return 'Coat';
    else return 'Padded_jacket';
  }

  return (
    <>
      <div className={styles.mainpage__TopButton}>
        {/* 상의 */}
        {topCategory === 'Shirt' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Shirt' } }}
          >
            <div className={styles.Tshirt}></div>
          </Link>
        )}
        {topCategory === 'Short_T_shirt' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Short_T_shirt' },
            }}
          >
            <div className={styles.Tshirt}></div>
          </Link>
        )}
        {topCategory === 'Long_T_shirt' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Long_T_shirt' },
            }}
          >
            <div className={styles.Tshirt}></div>
          </Link>
        )}
        {topCategory === 'Hoodies' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
          >
            <div className={styles.Tshirt}></div>
          </Link>
        )}
        {topCategory === 'Sweat_shirt' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Sweat_shirt' },
            }}
          >
            <div className={styles.Tshirt}></div>
          </Link>
        )}
        {topCategory === 'Sweater' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Sweater' } }}
          >
            <button className={styles.Tshirt}></button>
          </Link>
        )}

        {/* 바지 */}
        {bottomCategory === 'Denim' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Denim' } }}
          >
            <button className={styles.Pants}></button>
          </Link>
        )}
        {bottomCategory === 'Slacks' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Slacks' } }}
          >
            <div className={styles.Pants}></div>
          </Link>
        )}
        {bottomCategory === 'Sport_pants' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Sport_pants' },
            }}
          >
            <div className={styles.Pants}></div>
          </Link>
        )}
        {bottomCategory === 'Short_pants' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Short_pants' },
            }}
          >
            <div className={styles.Pants}></div>
          </Link>
        )}

        {/* 아우터 */}
        {outerCategory === 'Jacket' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Jacket' } }}
          >
            <button className={styles.Outer}></button>
          </Link>
        )}
        {outerCategory === 'Coat' && (
          <Link href={{ pathname: '../closet/1', query: { category: 'Coat' } }}>
            <div className={styles.Outer}></div>
          </Link>
        )}
        {outerCategory === 'Padded_jacket' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Padded_jacket' },
            }}
          >
            <div className={styles.Outer}></div>
          </Link>
        )}
        {outerCategory === 'Blazer' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Blazer' } }}
          >
            <div className={styles.Outer}></div>
          </Link>
        )}
        {outerCategory === 'Mustang' && (
          <Link
            href={{ pathname: '../closet/1', query: { category: 'Mustang' } }}
          >
            <div className={styles.Outer}></div>
          </Link>
        )}
        {outerCategory === 'Sport_Jacket' && (
          <Link
            href={{
              pathname: '../closet/1',
              query: { category: 'Sport_Jacket' },
            }}
          >
            <div className={styles.Outer}></div>
          </Link>
        )}
        {/* 기타 카테고리들 추가 */}
      </div>
      <div className={styles.mainpage__BottomButton}>
        <Link href="/AIrecommend">
          <button className={styles.Ai}></button>
        </Link>
        <Link href={{ pathname: '../calendarpage' }}>
          <button className={styles.Report}></button>
        </Link>
      </div>
    </>
  );
}
