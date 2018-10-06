import React from 'react';
import { Col , Row, Input,Icon } from 'antd';
const {Search} = Input;

const headerContent = (props) =>
{
  return(
    <Row>
      <Col span={6}>
        <img  width={50} height={50} src={require('../../../assets/logo/logo1.png')} />
        <img  width={80} height={30} src={require('../../../assets/logo/logoName.png')} />
      </Col>
      <Col span={12}>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: "100%",height : '64px'  }}
        />
      </Col>
      <Col span={6}>
        <div style={{float : 'right'}}>
          <a>
            <Icon type="logout" style={{fontSize : 25,color : 'black'}} theme="outlined" />
          </a>
        </div>
      </Col>
    </Row>
  );
};
export default headerContent;