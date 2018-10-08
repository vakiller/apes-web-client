import React from 'react';
import './login.less';
import {withRouter, Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button, notification} from 'antd';
import newlogo from '../../assets/logo/logo1.png';
import {Layout} from 'antd';
import BackgroundImage from '../../assets/images/background.png';
import {registerAccount} from './api/authenticate';

const {Footer} = Layout;

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email : '',
      password : '',
      repassword : '',
      errMessage : '',
      notificationMess  : '',
      notificationTitle : '',
      notificationOpen : false,
      isLogin : false
    };
  }
  handleSubmit = async () => {
    this.setState({
      errMessage : ''
    });
    if(this.state.password !== this.state.repassword)
    {
      this.setState(
        {
          errMessage : 'Mật khẩu không trùng khớp'
        }
      );
    }
    else
    {
      let mess = await registerAccount(this.state.name,this.state.email,this.state.password);
      console.log(mess);
      if(mess == "OK")
      {
        this.setState({
          isLogin : true,
          notificationOpen : true,
          notificationTitle : 'Successful!',
          notificationMess : "Your Account Have Been Created Successful, we sent a Verification Mail to your email address, please check your email!"
        });
        notification['success']({
          message : this.state.notificationTitle,
          description : this.state.notificationMess
        });
      };
    }
  };

  componentDidMount()
  {

  };

  render() {
    if(this.state.isVerify)
    {
      return <Redirect to={{
        pathname : "/login"
      }} />
    }
    if(this.state.isLogin)
    {
      return(
        <Redirect to={{
          pathname: "/kanban"
        }} />
      );
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
            <div className="login__greeting">REGISTER</div>
            <Form.Item
              // help={this.state.errMessage}
            >
              <Input
                name="Name"
                autoFocus
                prefix={<Icon type="info" style={{color: '#5a5a5a'}}/>}
                placeholder="Name"
                onChange={ (event) => this.setState( { name : event.target.value })}
                // value={username}
                // className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />

            </Form.Item>
            <Form.Item
              // help={this.state.errMessage}
            >
              <Input
                name="email"
                prefix={<Icon type="user" style={{color: '#5a5a5a'}}/>}
                placeholder="Email"
                onChange={ (event) => this.setState( { email : event.target.value })}
                // value={username}
                // className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />

            </Form.Item>
            <Form.Item
              // help={this.state.errMessage}
            >
              <Input
                name="password"
                prefix={<Icon type="lock" style={{color: '#5a5a5a'}}/>}
                type="password"
                placeholder="Enter Your Password"
                onChange={ (event) => this.setState( { password : event.target.value })}
                // value={username}
                // className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />

            </Form.Item>
            <Form.Item
              // help={this.state.errMessage}
            >
              <Input
                name="rePassword"
                type="password"
                prefix={<Icon type="unlock" style={{color: '#5a5a5a'}}/>}
                placeholder="Re Enter Your Password"
                onChange={ (event) => this.setState( { repassword : event.target.value })}
                // value={username}
                // className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />

            </Form.Item>
            <Form.Item
              help={this.state.errMessage}
            >

              <Button
                type="primary"
                size="large"
                onClick={ () => this.handleSubmit() }
              >Đăng Ký
              </Button>
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

export default withRouter(RegisterUser);


