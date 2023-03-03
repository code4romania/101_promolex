import cookie from 'js-cookie';

const VOTE_ID = 'vote-id';
const VOTE_TIMESTAMP = 'vote-timestamp';

export const setVoteCookies = (id: string, timestamp: string) => {
  cookie.set(VOTE_ID, id, {
    expires: 1,
  });
  cookie.set(VOTE_TIMESTAMP, timestamp, {
    expires: 1,
  });
};

export const removeVoteCookies = () => {
  cookie.remove(VOTE_ID);
  cookie.remove(VOTE_TIMESTAMP);
};

export const getVoteCookies = () => {
  const voteId = cookie.get(VOTE_ID);
  const voteTimestamp = cookie.get(VOTE_TIMESTAMP);

  return {
    voteId,
    voteTimestamp,
  };
};
