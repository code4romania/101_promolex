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
  const { data: registeredProjects } = useRegisteredProjectsQuery({
    from: getDateString(fromDate),
    to: getDateString(toDate),
  });

  const { data: registeredProjectsByFirstLecture } = useRegisteredProjectsQuery(
    {
      from: getDateString(fromDate),
      lectura: 'I lectură',
      to: getDateString(toDate),
    },
  );
  const { data: registeredProjectsBySecondLecture } =
    useRegisteredProjectsQuery({
      from: getDateString(fromDate),
      lectura: 'II lectură',
      to: getDateString(toDate),
    });
  const { data: registeredProjectsByThirdLecture } = useRegisteredProjectsQuery(
    {
      from: getDateString(fromDate),
      lectura: 'III lectură',
      to: getDateString(toDate),
    },
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
    registeredProjectsByFirstLecture,
    registeredProjectsBySecondLecture,
    registeredProjectsByThirdLecture,
    toDate,
  };
};
