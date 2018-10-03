import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import './apesLayout.css';
import { SIDER_LIST } from '../../constants';

const {Header, Content, Sider, Footer} = Layout;

class apesLayout extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState(
      {
        collapsed: !this.state.collapsed
      }
    );
  };
  renderSiderMenuItem = () =>
  {

  };
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{backgroundColor: '#ffff',borderRightWidth : 0}}
        >
          <Menu theme="light" style={{border: null}} defaultSelectedKeys={['1']}>
            <div className="logoSider">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              theme={"outlined"}
            />
            </div>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className="layoutStyle">
            <Header>

            </Header>
            <Content style={{height: '100vh'}}>
              {this.props.children}

            </Content>
            <Footer style={{textAlign: 'center'}}>
              Copyright ©2018 by Apes-AT12C-Team
            </Footer>
          </div>
        </Layout>
      </Layout>
    );
  };
}

export default apesLayout;