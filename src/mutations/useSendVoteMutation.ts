import { useMutation } from '@tanstack/react-query';
import { sendVote } from '../services';

export const useSendVoteMutation = () => useMutation(['sendVote'], sendVote);
