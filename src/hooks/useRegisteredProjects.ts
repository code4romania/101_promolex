import { useState, useCallback } from 'react';
import {
  useCurrentLegislatureDetailsQuery,
  useRegisteredProjectsQuery,
} from '../queries';
import {
  getDateString,
  getLegislatureFromDate,
  setLegislatureFromDate,
} from '../utils';

export const useRegisteredProjects = () => {
  const [fromDate, setFromDate] = useState<Date>(
    new Date(getLegislatureFromDate() ?? Date.now()),
  );
  const [toDate, setToDate] = useState<Date>(new Date(Date.now()));
  useCurrentLegislatureDetailsQuery({
    onSuccess: ({ legislatureFrom }) => {
      setFromDate(new Date(legislatureFrom));
      setLegislatureFromDate(legislatureFrom);
    },
    refetchOnMount: true,
    staleTime: 0,
  });
  const { data: registeredProjects } = useRegisteredProjectsQuery({
    from: getDateString(fromDate),
    to: getDateString(toDate),
  });

  const onFromDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setFromDate(date);
  }, []);

  const onToDateChange = useCallback((date: Date | null) => {
    if (!date) return;
    setToDate(date);
  }, []);

  return {
    fromDate,
    onFromDateChange,
    onToDateChange,
    registeredProjects,
    toDate,
  };
};
