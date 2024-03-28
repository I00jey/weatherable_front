import Link from 'next/link';
import styles from '../../styles/mainpage/mainpage.module.scss';

export default function Mainpagebutton() {
  return (
    <>
      <div className={styles.mainpage__TopButton}>
        <Link href={{ pathname: '../closet/1', query: { category: 'Shirt' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Short_T_shirt' },
          }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Long_T_shirt' },
          }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Hoodies' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Sweat_shirt' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Sweater' } }}
        >
          <button className={styles.Pants}></button>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Denim' } }}>
          <button className={styles.Outer}></button>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Slacks' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Sport_pants' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Short_pants' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Jacket' } }}>
          <button className={styles.Outer}></button>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Coat' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Padded_jacket' },
          }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Blazer' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Mustang' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Sport_Jacket' },
          }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Running_shoes' },
          }}
        >
          <button className={styles.Outer}></button>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Dress_Shoes' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Sneakers' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Boots' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Short_Skirt' } }}
        >
          <button className={styles.Outer}></button>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Long_Skirt' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Short_Onepiece' },
          }}
        >
          <button className={styles.Outer}></button>
        </Link>
        <Link
          href={{
            pathname: '../closet/1',
            query: { category: 'Long_Onepiece' },
          }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Watch' } }}>
          <button className={styles.Outer}></button>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Jewelry' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Eyewear' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link
          href={{ pathname: '../closet/1', query: { category: 'Headwear' } }}
        >
          <div className={styles.Tshirt}></div>
        </Link>
        <Link href={{ pathname: '../closet/1', query: { category: 'Bag' } }}>
          <div className={styles.Tshirt}></div>
        </Link>
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
