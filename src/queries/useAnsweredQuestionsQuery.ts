import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchAnsweredQuestions } from '../services';
import { AnsweredQuestion } from '../types';

export const useAnsweredQuestionsQuery = (
  options?: UseQueryOptions<AnsweredQuestion[]>,
) =>
  useQuery<AnsweredQuestion[]>(
    ['answered-questions'],
    fetchAnsweredQuestions,
    options,
  );
