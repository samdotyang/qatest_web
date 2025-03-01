import React, { useEffect, useRef } from "react";
import StressHistoryList from "./stressHistoryList";
import { useGetStressHistoryList } from "@/hooks";

const StressHistory = () => {
  const dataFetchedRef = useRef(false);
  const {
    isStressHistoryListFetching,
    stressHistoryList,
    stressHistoryListError,
  } = useGetStressHistoryList();

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  }, []);

  return (
    <>
      <div className="text-primary-label  text-lg font-bold">
        History (only 10 records will be show):
      </div>
      {!isStressHistoryListFetching && !stressHistoryListError && (
        <StressHistoryList data={stressHistoryList.data} />
      )}
    </>
  );
};

export default StressHistory;
