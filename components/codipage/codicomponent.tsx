'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/codi/codi.module.scss';
import styles2 from '../../styles/codi/codi2.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import { cookiesend } from '../../service/codiApiservice';
import ClosetPage from '../../components/uploadcloset/uploadcloset';
import { getCodiInfo } from '../../service/getCodiInfoApi';
import MyComponent from '../codipage/image';
import { RootState } from '../../Store/Store';

// 선택된 날짜를 URL에서 추출하는 함수
function extractSelectedDateFromURL() {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    if (!queryString) return null;

    const queryParams = queryString.split('&');

    for (const param of queryParams) {
      if (param.startsWith('selectedDate=')) {
        const selectedDate = param.split('=')[1];
        return decodeURIComponent(selectedDate);
      }
    }
  }

  return null;
}

const CodiPage: React.FC<{}> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<{
    [key: string]: number | null;
  }>({
    capIndex: null,
    topIndex: null,
    outerIndex: null,
    bottomIndex: null,
    shoesIndex: null,
    accessoryIndex: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: string | null;
  }>({
    capIndex: null,
    topIndex: null,
    outerIndex: null,
    bottomIndex: null,
    shoesIndex: null,
    accessoryIndex: null,
  });
  const [targetCodi, setTargetCodi] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [codiName, setCodiName] = useState<string>('');
  const [codiInfo, setCodiInfo] = useState<any>(null); // 코디 정보 상태 추가

  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const extractedDate = extractSelectedDateFromURL();
    if (extractedDate) {
      const formattedDate = new Date(
        new Date(extractedDate).getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      setSelectedDate(formattedDate);
      console.log('페이지 selectedDate:', formattedDate);
      getCodiData(formattedDate); // formattedDate를 매개변수로 전달
    }
    console.log(extractedDate);
  }, []);

  const getCodiData = async (formattedDate) => {
    try {
      const codiInfo = await getCodiInfo({});
      console.log('초기 코디 정보:', codiInfo);
      // 받아온 코디 정보를 상태에 저장
      setCodiInfo(codiInfo);

      // 지정한 날짜에 해당하는 코디 정보를 찾습니다.
      const targetCodis = codiInfo.filter((item) => {
        // item.codiDate에서 시간 부분을 제거하여 날짜 부분만 추출합니다.
        const itemDate = item.codiDate.split('T')[0];

        // formattedDate에서도 시간 부분을 제거하여 날짜 부분만 추출합니다.
        const formattedDateWithoutTime = formattedDate.split('T')[0];

        // 두 날짜를 비교합니다.
        return itemDate === formattedDateWithoutTime;
      });

      // 날짜에 해당하는 코디 정보 중에서 가장 최근에 등록된 정보를 선택합니다.
      const foundTargetCodi =
        targetCodis.length > 0 ? targetCodis[targetCodis.length - 1] : null;

      console.log(formattedDate);
      console.log(foundTargetCodi);

      // 코디 정보가 있을 경우에만 상태 업데이트
      if (foundTargetCodi) {
        console.log(
          'Top:',
          foundTargetCodi.top ? foundTargetCodi.top.imagePath : null
        );
        console.log(
          'Bottom:',
          foundTargetCodi.bottom ? foundTargetCodi.bottom.imagePath : null
        );
        console.log(
          'Outer:',
          foundTargetCodi.outer ? foundTargetCodi.outer.imagePath : null
        );
        console.log(
          'Shoes:',
          foundTargetCodi.shoes ? foundTargetCodi.shoes.imagePath : null
        );
        console.log(
          'Cap:',
          foundTargetCodi.cap ? foundTargetCodi.cap.imagePath : null
        );
        console.log(
          'Accessory:',
          foundTargetCodi.accessory ? foundTargetCodi.accessory.imagePath : null
        );

        // 상태 업데이트
        setTargetCodi(foundTargetCodi);
      }
    } catch (error) {
      console.error('초기 코디 정보 요청 실패: ', error);
    }
  };
  const openModal = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageSelect = (imageSrc: string, id: number) => {
    // ID를 전달받도록 수정
    const updatedSelectedIndexes = { ...selectedIndexes };
    updatedSelectedIndexes[selectedCategory!] = id; // 선택된 옷의 ID로 업데이트
    setSelectedIndexes(updatedSelectedIndexes);
    setSelectedImages({ ...selectedImages, [selectedCategory!]: imageSrc });
    closeModal();
  };

  const handleRegister = async () => {
    try {
      const codiDTO = { ...selectedIndexes, codiName, selectedDate, userId };
      let UTCdate = new Date(codiDTO['selectedDate']);
      let localOffset = UTCdate.getTimezoneOffset() * 60000; // 현재 시간대 보정
      let localDate = new Date(UTCdate.getTime() - localOffset);
      codiDTO['codiDate'] = localDate.toISOString(); // 시간대 보정 후 ISO 문자열 생성
      await cookiesend(codiDTO);
      alert('등록되었습니다.');
    } catch (error) {
      console.error('데이터 전송 실패: ', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div className={styles2.container}>
        <div className={styles2.mainContainer}>
          <img
            src="https://weatherable.s3.ap-northeast-2.amazonaws.com/default_ai.png"
            alt=""
          />
          <div
            className={`${styles2.uploadButton} ${styles2.accessoryBox}`}
            onClick={() => openModal('capIndex')}
          >
            {selectedImages['capIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['capIndex']}
                onClick={() => openModal('capIndex')}
              />
            ) : (
              (targetCodi && targetCodi.cap && targetCodi.cap.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.cap.imagePath}
                  onClick={() => openModal('capIndex')}
                />
              )) ||
              '모자'
            )}
          </div>
          <div
            className={`${styles2.uploadButton} ${styles2.outerBox}`}
            onClick={() => openModal('outerIndex')}
          >
            {selectedImages['outerIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['outerIndex']}
                onClick={() => openModal('outerIndex')}
              />
            ) : (
              (targetCodi && targetCodi.outer && targetCodi.outer.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.outer.imagePath}
                  onClick={() => openModal('outerIndex')}
                />
              )) ||
              '아우터'
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.topBox}`}
            onClick={() => openModal('topIndex')}
          >
            {selectedImages['topIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['topIndex']}
                onClick={() => openModal('topIndex')}
              />
            ) : (
              (targetCodi && targetCodi.top && targetCodi.top.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.top.imagePath}
                  onClick={() => openModal('topIndex')}
                />
              )) ||
              '상의'
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.pantsBox}`}
            onClick={() => openModal('bottomIndex')}
          >
            {selectedImages['bottomIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['bottomIndex']}
                onClick={() => openModal('bottomIndex')}
              />
            ) : (
              (targetCodi &&
                targetCodi.bottom &&
                targetCodi.bottom.imagePath && (
                  <MyComponent
                    imageSrc={targetCodi.bottom.imagePath}
                    onClick={() => openModal('bottomIndex')}
                  />
                )) ||
              '하의'
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.shoesBox}`}
            onClick={() => openModal('shoesIndex')}
          >
            {selectedImages['shoesIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['shoesIndex']}
                onClick={() => openModal('shoesIndex')}
              />
            ) : (
              (targetCodi && targetCodi.shoes && targetCodi.shoes.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.shoes.imagePath}
                  onClick={() => openModal('shoesIndex')}
                />
              )) ||
              '신발'
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <button onClick={closeModal}>Close Modal</button>
          <div className={styles.modalContent}>
            <ClosetPage onImageSelect={handleImageSelect} />
          </div>
        </div>
      )}

      {/* 추가된 부분 시작 */}
      {/* <div>
        {targetCodi && (
          <div>
            {targetCodi.top && (
              <img src={targetCodi.top.imagePath} alt="Top Image" />
            )}
            {targetCodi.bottom && (
              <img src={targetCodi.bottom.imagePath} alt="Bottom Image" />
            )}
            {targetCodi.outer && (
              <img src={targetCodi.outer.imagePath} alt="Outer Image" />
            )}
            {targetCodi.shoes && (
              <img src={targetCodi.shoes.imagePath} alt="Shoes Image" />
            )}
            {targetCodi.cap && (
              <img src={targetCodi.cap.imagePath} alt="Cap Image" />
            )}
            {targetCodi.accessory && (
              <img src={targetCodi.accessory.imagePath} alt="Accessory Image" />
            )}
          </div>
        )}
      </div> */}
      {/* 추가된 부분 끝 */}

      <input
        type="text"
        value={codiName}
        onChange={(e) => setCodiName(e.target.value)}
        placeholder="코디 이름을 입력하세요."
      />
      <div>
        <button onClick={handleRegister}>등록하기</button>
      </div>
    </div>
  );
};

export default CodiPage;
