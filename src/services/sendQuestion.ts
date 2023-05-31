import axios from 'axios';
import { ContactFormData } from '../types';
import { apiPaths } from './apiUrls';

export const sendQuestion = async (
  params: ContactFormData,
): Promise<string> => {
  const stringParams = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${apiPaths.sendQuestion}&${stringParams}`);

  return data;
};
