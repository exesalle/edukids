import React from 'react';
import { UserProps } from '../../Types';
import { Tag} from 'antd';

const UserComponent = ({ props }: UserProps): JSX.Element => {

  return (
    <div className="user-box" id="user-box">
      <>
        {props?.user.username.includes('teacher') ?
          <>
            <Tag color="blue" className="username-button">
              {'Преподаватель'}
              <br />
              {props.user.name} {props?.buttonEl}
            </Tag>
          </> : <>
            <Tag color="green" className="username-button">
              {'Ученик'}
              <br />
              {props.user.name} {props?.buttonEl}
            </Tag>
          </>
        }
      </>
    </div>
  );
};

export default UserComponent;
