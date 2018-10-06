import React from 'react';
import './login.less';
import {withRouter, Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button} from 'antd';
import newlogo from '../../assets/logo/logo1.png';
import {Layout} from 'antd';
import BackgroundImage from '../../assets/images/background.png';

const {Footer} = Layout;

class UsernameLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify : false
    };
  }


  onChange = (event) => {
    this.setState({
      disabled: false,
      username: event.target.value
    })
  };

  handleSubmit = async () => {

    this.setState({
      isVerify : true
    });
    // let verifyReturn = await verifyUsername(this.state.username);
    // console.log(verifyReturn);
    // if (verifyReturn.httpCode === 200) {
    //   console.log(verifyReturn);
    //   localStorage.setItem('username', verifyReturn.username);
    //   localStorage.setItem('clientKey', verifyReturn.clientKey);
    //   localStorage.setItem('userId', verifyReturn.userId);
    //   localStorage.setItem('email', verifyReturn.email);
    //   this.setState({isHaveClientKey: true});
    // }
    // else {
    //   this.setState({errMessage: verifyReturn.error.message});
    // }
  };

  componentDidMount()
  {}

  render() {
    // if (this.state.isLogin) {
    //   return <Redirect to={{
    //     pathname: "/dashboard"
    //   }}/>
    // };
    if(this.state.isVerify)
    {
      return <Redirect to={{
        pathname : "/login"
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
                // placeholder="Email or Username"
                onChange={this.onChange}
                // value={username}
                className={`login__form__input `}
                size="large"
                // value={this.state.username}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={ () => this.handleSubmit() }
              >
                Next
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

export default withRouter(UsernameLogin);


