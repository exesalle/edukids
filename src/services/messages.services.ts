import {DataSnapshot, get, getDatabase, onValue, push, ref} from 'firebase/database';
import { IMessage } from '../Types';
export const db = getDatabase();

export const getLiveMessages = (chatId: string, listen: (_snapshot: DataSnapshot) => void) => {
  return onValue(ref(db, `channels/${chatId}/messages`), listen);
};

export const fromMessagesDocument = (snapshot: DataSnapshot): IMessage[] => {
  if (!snapshot.exists()) return [];
  const messagesDocument = snapshot.val();
  return Object.keys(messagesDocument).map((key) => {
    const message = messagesDocument[key];
    return {
      ...message,
      id: key,
      createdOn: new Date(message.createdOn)
    };
  });
};

export const addMessage = (chatId: string, username: string, content: string) => {
  return push(ref(db, `channels/${chatId}/messages`), {
    author: username,
    content,
    createdOn: Date.now()
  })
    .then((res) => {
      return getMessageById(chatId, res.key);
    });
};

export const getMessageById = (chatId: string, messageId: string | null) => {
  return get(ref(db, `channels/${chatId}/messages/${messageId}`))
    .then((res) => {
      if (!res.exists()) {
        throw new Error(`сообщение с id ${messageId} не найдено`);
      }
      const message = res.val();
      message.id = messageId;
      message.createdOn = new Date(message.createdOn);

      return message;
    });
};
