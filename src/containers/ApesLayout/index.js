import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import './apesLayout.css';
import HeaderContent from './headerContent/headerContent';
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
  renderSiderMenuItem = (item) =>
  {
    const {id , name, route, icon} = item;
    return(
      <Menu.Item key={id}>
        <Icon type={icon} />
        <span>{name}</span>
      </Menu.Item>
    );
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
            {SIDER_LIST.map((item) => this.renderSiderMenuItem(item))}
          </Menu>
        </Sider>
        <Layout>
          <div className="layoutStyle">
            <Header>
              <HeaderContent/>
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