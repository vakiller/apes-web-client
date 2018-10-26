import React from 'react';
import {Layout, Row, Col, Avatar,Icon,Popover,Button,Input,Drawer,List} from 'antd';
import ImageHolder from '../../createBoard/imageHolder';
import './HeaderStyle.less';
import { Actions } from '../../../../constants';
import RowLog from '../../../../components/rowLog/rowLog';
const {Header} = Layout;
const user1 = require('../../../../assets/images/user/user1.jpg');
const user2 = require('../../../../assets/images/user/user2.jpg');
const user3 = require('../../../../assets/images/user/user3.jpg');
const user4 = require('../../../../assets/images/user/user4.jpg');
const user5 = require('../../../../assets/images/user/user5.jpg');
const image1 = require('../../../../assets/images/board/1.jpg');
const image2 = require('../../../../assets/images/board/2.jpg');
const image3 = require('../../../../assets/images/board/3.jpg');
const image4 = require('../../../../assets/images/board/4.jpg');
const image5 = require('../../../../assets/images/board/5.jpg');
const image6 = require('../../../../assets/images/board/6.jpg');
const image7 = require('../../../../assets/images/board/7.jpg');
const image8 = require('../../../../assets/images/board/8.jpg');
const image9 = require('../../../../assets/images/board/9.jpg');
const _ = require('lodash');
const firebase = require('firebase');
class  HeaderDetail extends React.Component
{
  state={
    dataBoardNow : [],
    newUserUid : '',
    urlNow : '',
    visible: false,
    imageSelected : '',
    editName : '',
    newName : '',
    logBoard : '',
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidUpdate(prevProp,prevState) {
    if(this.props.dataBoardNow !== prevState.dataBoardNow)
    {
      this.setState({dataBoardNow : this.props.dataBoardNow,urlNow : this.props.urlNow})
      this.setState({
        imageSelected : this.state.dataBoardNow.imageId,
        logBoard : _.toArray(this.state.dataBoardNow.logBoard)
      });
    }
  }

  renderUser = (dataUser,index) =>
  {
    let randomNum = Math.floor(Math.random()*(5-1)+1);
    let avatarSrc;
    switch (randomNum) {
      case 1 :
      {
        avatarSrc = user1;
        break;
      }
      case 2 :
      {
        avatarSrc = user2;
        break;
      }
      case 3 :
      {
        avatarSrc = user3;
        break;
      }
      case 4 :
      {
        avatarSrc = user4;
        break;
      }
      case 5 :
      {
        avatarSrc = user5;
        break;
      }
    }
    return(
      <Popover
        key={index}
        title={dataUser.displayName}
        content={(
          <div>
            Email : {dataUser.email}
          </div>
        )}
        // key={dataUser.index}
      >
      <Avatar
        src={avatarSrc}
        size={50}
        shape={"square"}
        style={{marginRight  : 5}}
      />
      </Popover>
    );
  };
  renderUserNow = () =>
  {
    if(this.state.dataBoardNow !== [])
    {
      let userList = _.toArray(this.state.dataBoardNow.acceptUid);
      return userList.map((item,index) => {
        return this.renderUser(item,index)
      })
    }
  };
  onChangeNewUserName = (event) =>
  {
    this.setState({
      newUserUid : event.target.value
    });
  };
  addUserHandler = () => {
    console.log("In here ",this.state.newUserUid);
    const firebase = require('firebase');
    return firebase.database().ref("/users").on("value",snapshot => {
      snapshot.forEach( (user) => {
        if(user.key == this.state.newUserUid)
        {
          alert("found User: " + user.val().displayName);
          firebase.database().ref(localStorage.getItem('urlMeta')+"/acceptUid/"+user.key).set(user.val());
          firebase.database().ref("/"+user.key+"/boardsAccepting").push(localStorage.getItem('urlMeta'));
        }

      });
    });
    // let dataUserAdd =
    // firebase.database().ref(urlNow+"/acceptUid"+this.state.newUserUid).set();
  };
  renderPreviewBackground = () =>
  {
    return <img src={this.state.imageSelected} width={150} height={100} />
  };
  onClickImage = (imageChossed) =>
  {
    this.setState({
      imageSelected : imageChossed,
      visiblePop : false
    });
    let updates = {};
    let dataB = this.state.dataBoardNow;
    dataB.imageId = imageChossed;
    updates[localStorage.getItem('urlMeta')] = dataB;
    firebase.database().ref().update(updates);
    firebase.database().ref(localStorage.getItem('urlMeta')+"/logBoard").push(
      localStorage.getItem('displayName')+[Actions[7].name]
    );
  };
  renderLog = () =>
  {
    const data = this.state.logBoard;
    if(this.state.logBoard !== '')
    {
      return (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={user1} />}
                title={item}
              />
            </List.Item>
          )}
        />
      )
    }
  };
  render()
  {
    console.log(this.state.dataBoardNow);
    console.log(this.props);
    const ChooseImage = (
      <Row>
        <ImageHolder src={image1} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image2} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image3} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image4} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image5} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image6} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image7} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image8} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
        <ImageHolder src={image9} onClickHandler={(imageChossed) => this.onClickImage(imageChossed)} />
      </Row>
    );
    return(
      <Layout>
        <div className={"HeaderStyle"}>
        <Header>
          <Row>
            <Col span={6}>
              <div className={"titleBoard"}>
                {this.state.dataBoardNow.nameBoard}
              </div>
            </Col>
            <Col span={16} className={"avatar"}>
              <span className={"user_title"}>
              |
                <Icon style={{marginLeft : 20,marginRight : 15}} type="eye" theme="outlined" />
              </span>
              {this.renderUserNow()}
              <Popover title={"Add New User To This"}
                trigger={["click"]} placement="bottom"
                       content={(
                        <div>
                          <Input placeholder="Enter User UID" onChange={(event) => {this.onChangeNewUserName(event)}}  />
                          <Button type={"primary"} onClick={() => this.addUserHandler()}>
                            Add New
                          </Button>
                        </div>
                       )}
              >
                <Button style={{marginLeft : 10}} shape="circle" icon="plus" size="large" />
              </Popover>
            </Col>
            <Col span={2}>
                <Icon style={{float : 'right'}} onClick={() => this.showDrawer()} type="menu-fold" theme="outlined" style={{fontSize : 25}} />
            </Col>
            <Drawer
              title="Menu Bảng"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width={450}
            >
              <Popover
                content={ChooseImage}
                title="Chọn ảnh nền"
                trigger="click"
                placement="bottom"
                visible={this.state.visiblePop}
              />
                <p style={{fontSize : 18}} > Tên bảng : <span><b>{this.state.dataBoardNow.nameBoard}</b>
                </span>  <span>
                  <Popover title={"Edit Name"} placement={"bottom"}
                    content={(
                      <div>
                        <Input placeholder={"Enter new name"}
                          value={this.state.newName}
                               onChange={(event) => this.setState({newName : event.target.value})}
                        />
                        <Button type={"primary"} onClick={() => {
                          let updates = {};
                          let dataB = this.state.dataBoardNow;
                          dataB.nameBoard = this.state.newName;
                          updates[localStorage.getItem('urlMeta')] = dataB;
                          firebase.database().ref().update(updates);
                        }}>
                          Edit
                        </Button>
                      </div>
                    )}
                  >
                    <Icon type="edit" theme="outlined" />
                  </Popover>
                </span> </p>
                <Row style={{marginBottom: 10}}>
                  {this.renderPreviewBackground()}
                  <Button icon={"fund"} style={{marginLeft : 20}} onClick={() => this.setState({visiblePop : true})} >
                    Đổi ảnh nền
                  </Button>
                </Row>
              <Row>
                <Col span={16} className={"avatar"}>
                  {this.renderUserNow()}
                  <Popover title={"Add New User To This"}
                           trigger={["click"]} placement="bottom"
                           content={(
                             <div>
                               <Input placeholder="Enter User UID" onChange={(event) => {this.onChangeNewUserName(event)}}  />
                               <Button type={"primary"} onClick={() => this.addUserHandler()}>
                                 Add New
                               </Button>
                             </div>
                           )}
                  >
                    <Button style={{marginLeft : 10}} shape="circle" icon="plus" size="large" />
                  </Popover>
                </Col>
              </Row>
              <Row style={{backgroundColor : '#f9f9f9',borderRadius : 12,textAlign : 'center'}} >
                    {this.renderLog()}
              </Row>
            </Drawer>
          </Row>
        </Header>
        </div>
      </Layout>

    );
  };
}
export default HeaderDetail;