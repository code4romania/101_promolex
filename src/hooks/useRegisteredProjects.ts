import { useState, useCallback } from "react";
import {
  useCurrentLegislatureDetailsQuery,
  useRegisteredProjectsQuery,
} from "../queries";
import { getDateString } from "../utils";

export const useRegisteredProjects = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date(Date.now()));
  const [toDate, setToDate] = useState<Date>(new Date(Date.now()));
  useCurrentLegislatureDetailsQuery({
    onSuccess: ({ legislature_from, legislature_to }) => {
      setFromDate(new Date(legislature_from));
      setToDate(new Date(legislature_to));
    },
  });
  const { data: registeredProjects } = useRegisteredProjectsQuery(
    getDateString(fromDate),
    getDateString(toDate)
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
