import React from 'react';
import {Col,Row} from 'antd';

const ImageHolder = (props) =>
{
  return(
    <Col span={3} >
      <img onClick={() => props.onClickHandler(props.src)} src={props.src} width={150} height={100} />
    </Col>
  );
};
export default ImageHolder;