import React from 'react';
import './styles.less';
import {Avatar, Col, Row, Tabs} from 'antd';
import InformationForm from './InformationForm';

const TabPane = Tabs.TabPane;
const image = require('../../../assets/images/user/user2.jpg');

class HeaderDashboard extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    displayName : localStorage.getItem('displayName'),
    email : localStorage.getItem('email')
  };
  render() {
    return (
      <div className="header-dashboard">
        <Row>
          <Col md={3}>
            <Avatar className="avatar_profile" size={130}
                    src={image}/>
          </Col>
          <Col md={9}>
            <div className="title"><span>{localStorage.getItem('displayName')}</span></div>
          </Col>
        </Row>
        <Row className="">
          <Col md={3}/>
          <Col md={9}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin cá nhân" key="1"><InformationForm/></TabPane>
              <TabPane tab="Đổi mật khẩu" key="2"><InformationForm/></TabPane>
            </Tabs>
          </Col>

        </Row>
      </div>
    );
  };
}


export default HeaderDashboard;