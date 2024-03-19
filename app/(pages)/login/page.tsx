'use client';

import Link from 'next/link';
import styles from '../../../styles/User/login.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserData {
  userid: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  // Ref (입력 안할 시 자동 포커스)
  const useridInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState<UserData>({
    userid: '',
    password: '',
  });

  const [useridError, setUseridError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    if (name === 'userid') {
      if (value) {
        setUseridError(null);
      }
    } else if (name === 'password') {
      if (value) {
        setPasswordError(null);
      }
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 아이디 유효성 검사
    if (!userData.userid) {
      setUseridError('아이디를 입력해주세요.');
      useridInputRef.current?.focus();
      return;
    } else {
      setUseridError(null);
    }

    // 비밀번호 유효성 검사
    if (!userData.password) {
      setPasswordError('비밀번호를 입력해주세요.');
      passwordInputRef.current?.focus();
      return;
    } else {
      setPasswordError(null);
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/login`,
        userData
      );
      console.log('res > ', res.data);
      console.log('로그인 성공');
      // router.push('/mainpage');/
    } catch (error) {
      console.log('로그인 실패!', error);
      alert(
        '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.'
      );
      setUserData({ userid: '', password: '' }); // 입력값 초기화
    }
  };

  return (
    <>
      <div className={styles.login_Container}>
        <div className={styles.title}>로그인</div>

        <form onSubmit={handleLogin}>
          <div className={styles.content}>
            {/* id */}
            <div className={styles.login_Content_Container}>
              <div className={styles.login_title}>아이디</div>
              <input
                ref={useridInputRef}
                className={styles.login_input}
                name="userid"
                type="text"
                value={userData.userid}
                onChange={handleChange}
                placeholder="아이디"
              />
              {useridError && <p className={styles.errorMsg}>{useridError}</p>}
            </div>
            {/* password */}
            <div className={styles.login_Content_Container}>
              <div className={styles.login_title}>비밀번호</div>
              <input
                ref={passwordInputRef}
                className={styles.login_input}
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="비밀번호"
              />
              {passwordError && (
                <p className={styles.errorMsg}>{passwordError}</p>
              )}
            </div>
            {/* etc */}
            <div className={styles.login_info}>
              <div>아이디 찾기</div>
              <img src="bar.png" alt="" />
              <div>비밀번호 찾기</div>
              <img src="bar.png" alt="" />
              <Link href={'/signup'}>
                <div>회원가입</div>
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.login_Btn}>
            로그인
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
