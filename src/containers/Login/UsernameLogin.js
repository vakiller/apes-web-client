import React from 'react';
import './login.less';
import {withRouter, Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button} from 'antd';
import newlogo from '../../assets/logo/logo1.png';
import {Layout} from 'antd';
import BackgroundImage from '../../assets/images/background.png';
import register from "../../registerServiceWorker";
import {Login} from './api/authenticate';
const firebase = require('firebase');

const {Footer} = Layout;

class UsernameLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false,
      isRegister : false,
      username : '',
      password : '',
      errMess : ''
    };
  }
  onUsernameChange = (event) => {
    this.setState({
      disabled: false,
      username: event.target.value
    })
  };
  onPassChange = (event) => {
    this.setState({
      disabled: false,
      password: event.target.value
    })
  };
  handleSubmit = async () => {
    let mess = await Login(this.state.username,this.state.password);
    if(mess === "Ok")
    {
      this.setState({
        isLogin : true
      });
    }
    else{
      console.log("--------> ", mess);
      this.setState({
        errMess : mess
      });
      console.log(this.state.errMess);
    }

  };
  componentDidMount()
  {
    firebase.auth().onAuthStateChanged((user) => {
      if(user)
      {
        this.setState({isLogin : true})
      }
      else
      {
        this.setState({isLogin : false})
      }
    })
  }
  registerHandler =() =>
  {
    this.setState({
      isRegister : true
    });
  };
  render() {
    if(this.state.isLogin)
    {
      return <Redirect to={{
        pathname: "/kanban"
      }}
      />
    }
    if(this.state.isRegister)
    {
      return <Redirect to={{
        pathname: "/register"
      }} />
    }
    return (
      <Layout className="login" style={{minHeight: '100vh', backgroundImage: `url(${BackgroundImage})`}}>
        <Form className="login__form" >
          <div className="login__title">
            <center>
              <div className="login__title__panda">
                <img src={newlogo} width="50" height="50"/>
                <p className='login__title__login'>APES</p>
              </div>
            </center>
          </div>
          <div className='login__form__align'>
            <div className="login__greeting">LOGIN</div>
            <Form.Item
              // help={this.state.errMessage}
            >
              <Input
                name="username"
                autoFocus
                prefix={<Icon type="user" style={{color: '#5a5a5a'}}/>}
                placeholder="Email or Username"
                onChange={this.onUsernameChange}
                // value={username}
                className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />
            </Form.Item>
            <Form.Item
              help={this.state.errMess}
            >
              <Input
                name="password"
                prefix={<Icon type="lock" style={{color: '#5a5a5a'}}/>}
                placeholder="Enter your Password"
                onChange={this.onPassChange}
                // value={username}
                className={`login__form__input `}
                size="large"
                type={"password"}
                // value={this.state.username}
              />
            </Form.Item>
            <Form.Item
            >
              <Button
                type="primary"
                size="large"
                onClick={ () => this.handleSubmit() }
              >
                Next
              </Button>
            </Form.Item>
            <Form.Item style={{textAlign : 'center'}} >
              <a onClick={() => this.registerHandler()} >
                Đăng ký tài khoản mới
              </a>
            </Form.Item>
          </div>
        </Form>
        <Footer style={{textAlign: 'center'}}>
          Copyright @2018 AT12C-ApesTeam
        </Footer>
      </Layout>
    )
  }
}

export default withRouter(UsernameLogin);


