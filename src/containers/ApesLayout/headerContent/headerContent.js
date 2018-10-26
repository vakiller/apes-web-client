import React from 'react';
import { Col , Row, Input,Icon } from 'antd';
import { Redirect } from 'react-router-dom';

class headerContent extends React.Component
{
  state={
    isLogout: false
  };
  logoutHandler = () =>
  {
    const firebase = require('firebase');
    firebase.auth().signOut();
    localStorage.clear();
    this.setState({isLogout : true})
  };
  render()
  {
    if(this.state.isLogout)
    {
      return(
        <Redirect
          to={{pathname : "/"}}
        />
      );
    }
    return(
      <Row>
        <Col span={6}>
          <img  width={50} height={50} src={require('../../../assets/logo/logo1.png')} />
          <img  width={80} height={30} src={require('../../../assets/logo/logoName.png')} />
        </Col>
        <Col span={12}>
        </Col>
        <Col span={6}>
          <div style={{float : 'right'}}>
            <a onClick={() => this.logoutHandler()} >
              <Icon type="logout" style={{fontSize : 25,color : 'black'}} theme="outlined" />
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}
export default headerContent;