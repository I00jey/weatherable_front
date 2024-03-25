'use client';
import React, { useEffect } from 'react';
import Styles from '../../styles/calendar/calendar.module.scss';
import Codicomponent from '../../components/codipage/codicomponent';
import SelectedDateDisplay from '../../components/codipage/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';

const CodiPage: React.FC<{ selectedDate?: string; userId?: string }> = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );

  useEffect(() => {
    // 여기에서 필요한 작업 수행
  }, []);

  return (
    <div>
      <h1>코디 페이지</h1>
      <SelectedDateDisplay selectedDate={selectedDate} />
      <Codicomponent />
    </div>
  );
};

export default CodiPage;
