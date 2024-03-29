'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/header.module.scss';
import '../styles/icons.scss';
import SideBar from './sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const router = useRouter();


  const path = usePathname();

  console.log(path);

  // 닫기 버튼
  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {}, []);

  // 뒤로가기 버튼
  const back = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </li>
        <li>
          <Link href="/">
            <Image src="/logo.png" alt="로고" width={75} height={48} priority />
            {/* <img src="logo.png" alt="로고" /> */}
          </Link>
        </li>

        <li>

          {/* {backButtonVisible && (
            <button onClick={back}>
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
            </button>
          )} */}
          {path !== '/' ? (
            <button onClick={back}>
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
            </button>
          ) : (
            ''
          )}

        </li>
      </ul>
      {/* {isOpen && <SideBar open={isOpen} close={close} width={width} />} */}
      <SideBar open={isOpen} close={close} />
    </div>
  );
}
