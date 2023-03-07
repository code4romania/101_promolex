import axios from 'axios';
import { CommitteeMotion } from '../types';
import { mapKeysToCamelCase } from '../utils';
import { apiPaths } from './apiUrls';

type CommitteeMotionsProps = {
  lid: string;
  motion_type: 'simplă' | 'de cenzură';
};

export const fetchCommitteeMotionsByLegislature = async (
  params: CommitteeMotionsProps,
): Promise<CommitteeMotion[]> => {
  const queryParams = new URLSearchParams(params);

  const { data } = await axios.post(
    `${apiPaths.committeeMotions}&${queryParams}`,
  );

  return mapKeysToCamelCase(data);
};
