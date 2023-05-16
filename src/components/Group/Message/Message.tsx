import React, {useEffect, useState } from 'react';
import { getUserByUsername } from '../../../services/chats.services';
import { MessageProps, IUserInfo } from '../../../Types';
import './Message.scss';
import {auth} from '../../../firebase';
import {Tag} from 'antd';

const Message = ({ message}: MessageProps): JSX.Element => {
  const user = auth.currentUser;
  const currentUser = user?.displayName;
  const [author, setAuthor] = useState<IUserInfo>({} as IUserInfo);

  useEffect(() => {
    getUserByUsername(message.author)
      .then((res) => setAuthor(res.val()))
      .catch(console.error);
    console.log(message.author);
  }, [message.author]);

  const isCurrentUserAuthor = currentUser === message.author;

  return (
    <Tag  className={isCurrentUserAuthor ? 'my-message' : 'others-message'}>
      <div className="message-author">
        {author.name}
            @{message.author}
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </Tag>
  );
};

export default Message;
