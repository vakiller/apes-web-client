import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Layout, Form, Icon, Input, Button} from 'antd';
import {getAccessToken} from './api/authenticate';
import './login.less';
import BackgroundImage from '../../assets/images/background.png';
import newlogo from '../../assets/images/newlogo.png';

const {Footer} = Layout;


class PasswordLogin extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    username: null,
    password: null,
    isHaveClientKey: true,
    errMessage: null,
    isLogin: false
  };
  componentDidMount(){
    if (!localStorage.getItem('clientKey')) {
      this.setState({isHaveClientKey: false});
    }
    else {
      this.setState({
        username: localStorage.getItem('username')
      });
    }
    console.log(this.props);
    window.addEventListener('popstate', () => {
      this.props.history.push('/');
    });
    // window.history.pushState({urlPath : '/'},'User Login','/');

  };


  changeAccountHandle = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('clientKey');
    this.props.history.push('/');
  };
  onChange = (event) => {
    this.setState({
      password: event.target.value
    });
  };
  loginHandle = async () => {
    const {password, username} = this.state;
    if (!password) {
      this.setState({errMessage: i18n.t('login.invalid_password')});
    }
    else {
      let response = await getAccessToken({username, password, grant_type: 'password'});
      console.log(response);
      if (response.httpCode === 200) {
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.accessToken);
        localStorage.setItem('expiresAt', response.accessTokenExpiresAt);
        this.setState({errMessage: '', isLogin: true});
      }
      else{
        this.setState({
          errMessage: i18n.t('login.not_match')
        });
      }
    }
  };

  render() {
    if(!this.state.isHaveClientKey)
    {
      return <Redirect to={{pathname: '/'}} />
    }
    if (this.state.isLogin) {
      return <Redirect to={{
        pathname: "/dashboard"
      }}/>
    }
    return (

      <Layout className="login" style={{minHeight: '100vh', backgroundImage: `url(${BackgroundImage})`}}>
        <Form className="login__form">
          <div className="login__title">
            <center>
              <div className="login__title__panda">
                <img src={newlogo} width="50" height="50"/>
                <p className='login__title__login'>{i18n.t('login.title')}</p>
              </div>
            </center>
          </div>
          <div className='login__form__align'>
            <div className="login__greeting__hi" style={{marginBottom: 15}}>
              <span>Account: </span>
              <span style={{fontWeight: 600}}> {this.state.username} </span>
            </div>
            <div className="login__greeting">
              <span style={{float: 'left'}}>{i18n.t('login.greeting_password')}</span>
              <span style={{float: 'right'}}><a>{i18n.t('login.forgot_password')}</a></span>
            </div>
            <Form.Item
              help={this.state.errMessage}
            >
              <Input
                name="password"
                autoFocus
                prefix={<Icon type="lock" style={{color: '#5a5a5a'}}/>}
                size="large"
                type="password"
                // placeholder="Email or Username"
                onChange={this.onChange}
                // value={username}
                className={`login__form__input `}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => this.loginHandle()}>
                Login</Button>
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
              <a onClick={() => this.changeAccountHandle()}>{i18n.t('login.change_account')}</a>
            </Form.Item>
          </div>
        </Form>
        <Footer style={{textAlign: 'center'}}>
          Copyright @2018 Shippo
        </Footer>
      </Layout>
    )
  }
}

export default withRouter(PasswordLogin);


