import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../Store/userSlice/userSlice';
import { RootState } from '../Store/Store';
interface props {
  open: Boolean;
  close: () => void;
}

export default function SideBar({ open, close }: props) {
  const dispatch = useDispatch();
  const path = usePathname();

  // Redux에서 userid 상태 가져오기. (RootState 타입 지정)
  const userId = useSelector((state: RootState) => state.user.userId);
  // console.log('userId > ', userId); // userId 값 가져오는 확인.

  // 로그인 상태 state
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!userId); // 사용자 ID가 있으면 로그인 상태로 설정해주기.
    // accessToken이 없으면 로그아웃 시키기.
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      dispatch(setUserId(''));
      setLoggedIn(false);
      close(); // 사이드바 닫기
    }
  }, [userId]); // userId가 변경 될 때마다 useEffect 실행.

  const logOut = () => {
    // 로그아웃 시 userId 상태 초기화
    dispatch(setUserId(''));
    sessionStorage.clear(); // 세션 스토리지의 모든 값 제거. (2개 토큰 - R.T , A.T) 제거.
    // 로그아웃 시 UI 갱신
    setLoggedIn(false);
    close();
  };

  // console.log(path);

  const sidebarLeft = open ? '0%' : '-100%';

  return (
    <div
      className={styles.sideBarContainer}
      style={{
        opacity: open ? '1' : '0',
        left: sidebarLeft,
      }}
      onClick={close}
    >
      <div className={styles.sideBarInnerBox} style={{ left: sidebarLeft }}>
        <nav className={styles.sideBarContentBox}>
          <ul className={styles.userBox}>
            {/* 삼항 연산자로 로그인 / 회원가입 / 로그아웃 변경 */}
            {loggedin ? (
              <ul className={styles.myPageBox}>
                <li>
                  <Link href={'/mypage'}>
                    <span>마이페이지</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <li className={styles.loginBtn}>
                  <Link href="/login" onClick={close}>
                    로그인
                  </Link>
                </li>
                <li className={styles.registerBtn}>
                  <Link href="/signup" onClick={close}>
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className={styles.navBox}>
            <li>
              <Link href="/" onClick={close}>
                <span className="material-symbols-outlined ">psychology</span>
                <p>AI 옷 추천</p>
              </Link>
            </li>
            <li className={styles.cat}>
              <span>옷장</span>
            </li>

            <li>
              <Link href={`/closet/${userId}`} onClick={close}>
                {path == `/closet/${userId}` && (
                  <div className={styles.path}>-</div>
                )}
                <span className="material-symbols-outlined">apparel</span>
                <p>옷장 보기</p>
              </Link>
            </li>
            <li>
              <Link href={`/closet/1`} onClick={close}>
                <span className="material-symbols-outlined">star</span>
                <p> 즐겨찾기 옷장</p>
              </Link>
            </li>
            <li className={styles.cat}>
              <span>코디</span>
            </li>
            <li>
              <Link href={'/codipage'} onClick={close}>
                {path == '/codipage' && <div className={styles.path}>-</div>}
                <span className="material-symbols-outlined">
                  deployed_code_account
                </span>
                <p>내 코디</p>
              </Link>
            </li>
            <li>
              <Link href="/" onClick={close}>
                <span className="material-symbols-outlined">star</span>
                <p>즐겨찾기 코디</p>
              </Link>
            </li>
          </ul>
          {loggedin && (
            <ul className={styles.logoutBox}>
              <li>
                <Link href={'/login'} onClick={logOut}>
                  <span>로그아웃 </span>
                  <span className="material-symbols-outlined">logout</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {
        <button
          onClick={close}
          className={styles.closeBtn}
          style={{
            opacity: open ? '1' : '0',
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      }
    </div>
  );
}
