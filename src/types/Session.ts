export type Session = {
  title: string;
  sessionDate: string;
  link: string;
  isLive: '0' | '1';
};

export type LiveSession = Omit<Session, 'isLive'>;
