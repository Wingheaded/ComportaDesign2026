
export enum Language {
  PT = 'PT',
  EN = 'EN',
}

export type Message = {
  sender: 'user' | 'bot';
  text: string;
};
