import {DataSnapshot, get, getDatabase, onValue, push, ref, update} from 'firebase/database';
import { IMessage } from '../Types';

export const dbr = getDatabase();

export const getLiveMessages = (chatId: string, listen: (_snapshot: DataSnapshot) => void) => {
  return onValue(ref(dbr, `channels/${chatId}/messages`), listen);
};

export const fromMessagesDocument = (snapshot: DataSnapshot): IMessage[] => {
  if (!snapshot.exists()) return [];

  const messagesDocument = snapshot.val();
  return Object.keys(messagesDocument).map((key) => {
    const message = messagesDocument[key];

    return {
      ...message,
      id: key,
      createdOn: new Date(message.createdOn),
      likedBy: message.likedBy ? Object.keys(message.likedBy) : [],
    };
  });
};

export const addMessage = (chatId: string, username: string, content: string) => {
  return push(ref(dbr, `channels/${chatId}/messages`), {
    author: username,
    content,
    createdOn: Date.now(),
    likedBy: [],
  })
    .then((res) => {
      return getMessageById(chatId, res.key);
    });
};

export const getMessageById = (chatId: string, messageId: string | null) => {
  return get(ref(dbr, `channels/${chatId}/messages/${messageId}`))
    .then((res) => {
      if (!res.exists()) {
        throw new Error(`Message with id ${messageId} does not exist!`);
      }

      const message = res.val();
      message.id = messageId;
      message.createdOn = new Date(message.createdOn);

      if (!message.likedBy) {
        message.likedBy = [];
      } else {
        message.likedBy = Object.keys(message.likedBy);
      }

      return message;
    });
};
