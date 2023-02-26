import { useState, useCallback } from 'react';
import {
  useCurrentLegislatureDetailsQuery,
  useRegisteredProjectsQuery,
} from '../queries';
import { getDateString } from '../utils';

export const useRegisteredProjects = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  useCurrentLegislatureDetailsQuery({
    onSuccess: ({ legislatureFrom, legislatureTo }) => {
      setFromDate(new Date(legislatureFrom));
      setToDate(new Date(legislatureTo));
    },
  });
  const { data: registeredProjects } = useRegisteredProjectsQuery(
    getDateString(fromDate),
    getDateString(toDate),
  );

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
