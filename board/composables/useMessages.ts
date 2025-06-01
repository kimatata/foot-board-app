import type { Message } from '~/types/base';

export const useMessages = () => {
  return useState<Message[]>('messages', () => []);
};
