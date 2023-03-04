import { useMutation } from '@tanstack/react-query';
import { sendQuestion } from '../services';

export const useSendQuestionMutation = () =>
  useMutation(['send-question'], sendQuestion);
