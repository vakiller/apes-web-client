import React from 'react';
import './style.less';
import {Card} from 'antd';
import img1 from "../../assets/images/board/1.jpg";
import img2 from "../../assets/images/board/2.jpg";
import img3 from "../../assets/images/board/3.jpg";
import img4 from "../../assets/images/board/4.jpg";
import img5 from "../../assets/images/board/5.jpg";
import img6 from "../../assets/images/board/6.jpg";
import img7 from "../../assets/images/board/7.jpg";
import img8 from "../../assets/images/board/8.jpg";
import img9 from "../../assets/images/board/9.jpg";
const {Meta} = Card;
const boardThumnail = (props) =>
{
  let imgNow;
  switch (props.imgSrc) {
    case 1 : {
      imgNow = img1;
      break;
    }
    case 2 : {
      imgNow = img2;
      break;
    }
    case 3 : {
      imgNow = img3;
      break;
    }
    case 4 : {
      imgNow = img4;
      break;
    }
    case 5 : {
      imgNow = img5;
      break;
    }
    case 6 : {
    imgNow = img6;
    break;
    }
    case 7 : {
      imgNow = img7;
      break;
    }
    case 8 : {
      imgNow = img8;
      break;
    }
    case 9 : {
      imgNow = img9;
      break;
    }
  }
  return(
    <div className={"around"}>
    <Card className="boardThum"
      cover={<img src={props.imgSrc} />}
          style={{height : 300}}
          hoverable={true}
    >
      <Meta
        title={props.children}
        description={props.owner}
      />
    </Card>
    </div>
  );
};
export default boardThumnail;