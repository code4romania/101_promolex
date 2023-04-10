export type Session = {
  title: string;
  sessionDate: string;
  link: string;
  isLive: '0' | '1';
  sid: string;
  eid: string;
};

export type LiveSession = Omit<Session, 'isLive'>;
