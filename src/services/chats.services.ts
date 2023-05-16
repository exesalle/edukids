import {
  ref,
  get,
  push,
  update,
  query,
  equalTo,
  orderByChild,
  getDatabase,
  onValue,
  DataSnapshot
} from 'firebase/database';

import { IUserInfo } from '../Types';

export const db = getDatabase();

export const getLiveChatsByUsername = (username: string, listen: (_snapshot: DataSnapshot) => void) => {
  return onValue(ref(db, `users/${username}/channels`), listen);
};

export const getUserByUsername = (username: string) => {
  return get(ref(db, `users/${username}`));
};
export const getChatById = (id: string | null) => {
  return get(ref(db, `channels/${id}`))
    .then((result) => {
      if (!result.exists()) {
        throw new Error(`Группа с id ${id} не найдена`);
      }
      const chat = result.val();
      chat.id = id;
      chat.date = new Date(chat.date);

      if (!chat.participants) {
        chat.participants = {};
      } else {
        chat.participants = Object.values(chat.participants);
      }
      return chat;
    });
};

export const updateUserChats = (username: string, chatName: string) => {
  const updateChats: { [index: string]: boolean } = {};
  updateChats[`/users/${username}/channels/${chatName}`] = true;
  return update(ref(db), updateChats);
};

export const createChat = (title: string, participants: string[] | IUserInfo[], teacher: string, course: string) => {
  return push(ref(db, 'channels'), {
    title,
    participants,
    messages: [],
    teacher: teacher,
    course: course,
    lastActivity: Date.now(),
    isPublic: false,
  })
    .then((result) => getChatById(result.key));
};

export const getChatByName = (chatName: string) => {
  return get(query(ref(db, 'channels'), orderByChild('title'), equalTo(chatName)));
};

export const updateChatLastActivity = (channelID: string, date: number) => {
  return update(ref(db), {
    [`channels/${channelID}/lastActivity`]: date,
  });
};
