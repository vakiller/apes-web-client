import React from 'react';
import {Modal, Button, Input, Icon, Popover,Menu,Row,Col} from 'antd';
import ImageHolder from './imageHolder';
import {Actions} from '../../../constants';
const image1 = require('../../../assets/images/board/1.jpg');
const image2 = require('../../../assets/images/board/2.jpg');
const image3 = require('../../../assets/images/board/3.jpg');
const image4 = require('../../../assets/images/board/4.jpg');
const image5 = require('../../../assets/images/board/5.jpg');
const image6 = require('../../../assets/images/board/6.jpg');
const image7 = require('../../../assets/images/board/7.jpg');
const image8 = require('../../../assets/images/board/8.jpg');
const image9 = require('../../../assets/images/board/9.jpg');


class CreateBoard extends React.Component {
  state = {
    visible: false,
    imageSelected : image1,
    visiblePop : false,
    nameBoard : ''
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevState.visible) {
      this.setState({
        visible: this.props.visible
      });
    }
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.props.closeModalHandle();
    this.addNewBoard();
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.props.closeModalHandle();
  };
  addNewBoard = () =>
  {
    const firebase = require('firebase');
    let uid = localStorage.getItem('uid');
    let name = localStorage.getItem('displayName');
    let email = localStorage.getItem('email');
    let UrlNow = "/"+uid+"/boards";
    let Url2 = "/"+uid+"/boardsAccepting";
    let idNow = Math.random().toString(36).substr(2,9);
    console.log(UrlNow);
    const dataAdd = {
      "acceptUid" : {
        [uid] : {
          "displayName" : name,
          "email" : email
        },
      },
      "id" : idNow,
      "imageId" : this.state.imageSelected,
      "nameBoard" : this.state.nameBoard,
      "by" : localStorage.getItem('displayName')
    };
    let keyNow = '';
    firebase.database().ref(UrlNow).push(dataAdd).then((data) =>
    {
      dataAdd['url'] = data.key;
      let UrlNow2 = UrlNow+"/"+data.key;
      firebase.database().ref(UrlNow2).set(dataAdd);
      firebase.database().ref(Url2).push(UrlNow2);
      let urlLog = UrlNow2+"/logBoard";
      firebase.database().ref(urlLog).push(
         localStorage.getItem("displayName")+[Actions[0].name]
      );
    });
    // let updates = {};
    // updates[UrlNow+"/"+keyNow] = dataAdd;
    // firebase.database().ref().update(updates);
  };
  onClickImage = (imageChossed) =>
  {
    this.setState({
      imageSelected : imageChossed,
      visiblePop : false
    });
  };
  handleChangeName = (event) =>
  {
    this.setState({
      nameBoard : event.target.value
    });
  };
  renderPreviewBackground = () =>
  {
    return <img src={this.state.imageSelected} width={150} height={100} />
  };
  render() {
    console.log(this.state);
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
    return (
        <Modal
          title="Add New Board"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={"Enter New Board Name"}
            style={{marginBottom : 20}}
            onChange={(event) => this.handleChangeName(event) }
          />
          <Popover
            content={ChooseImage}
            title="Chọn ảnh nền"
            trigger="click"
            placement="bottom"
            visible={this.state.visiblePop}
          >
            <Row style={{marginBottom: 10}}>
            {this.renderPreviewBackground()}
            </Row>
            <Button icon={"fund"} onClick={() => this.setState({visiblePop : true})} >
              Đổi ảnh nền
            </Button>

          </Popover>
        </Modal>
    );
  }
}
export default CreateBoard;
