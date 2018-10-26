import React from 'react';
import {Row, Avatar,List} from 'antd';
const user1 = require('../../assets/images/user/user1.jpg');
const user2 = require('../../assets/images/user/user2.jpg');
const user3 = require('../../assets/images/user/user3.jpg');
const user4 = require('../../assets/images/user/user4.jpg');
const user5 = require('../../assets/images/user/user5.jpg');

const renderUser = () => {
  let randomNum = Math.floor(Math.random() * (5 - 1) + 1);
  let avatarSrc;
  switch (randomNum) {
    case 1 : {
      return avatarSrc = user1;

    }
    case 2 : {
      return avatarSrc = user2;
      break;
    }
    case 3 : {
      return avatarSrc = user3;

    }
    case 4 : {
      return avatarSrc = user4;

    }
    case 5 : {
      return avatarSrc = user5;

    }
  }
};
const rowLog = (props) =>
{
  return(
    <List.Item
      avatar={<Avatar src={renderUser()} />}
    >
      Log 1
    </List.Item>
  );
};
export default rowLog