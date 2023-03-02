export type Event = {
  eid: string;
  title: string;
  shortDescription: string;
  pubdate: string;
  logo: string;
};

export type EventDetails = Event & {
  content: string;
  photos: { file: string }[];
};
