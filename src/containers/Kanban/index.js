import React from 'react';
import {Card, Divider, Row, Col,Icon, Button} from 'antd';
import './style.less';
import BoardThum from '../../components/boardThumnail/boardThumnail';
import _ from 'lodash';
import CreateBoard from './createBoard/createBoard';
import {Redirect,Link} from 'react-router-dom';
const BASE_URL = "/boards";

class ListKanban extends React.Component {
  state = {
    dataBoards : [],
    boardsAccepting : [],
    isAddNew : false
  };
  componentDidMount() {
    const firebase = require('firebase');
    let Url = "/"+localStorage.getItem('uid')+"/boardsAccepting";
    console.log("aasdasdas ",Url);
    return firebase.database().ref(Url).on('value',(snapshot) =>{
      console.log("=======================> ", snapshot.val());
      this.setState({
        boardsAccepting : _.toArray(snapshot.val())
      });
      this.state.boardsAccepting.map((item,index) => {
        console.log("vsacas ",item);
        this.getBoard(item);
      });
    });

  }
  renderThumnail = () =>
  {
    if(this.state.dataBoards !== null)
    {
      return this.state.dataBoards.map((item,index) => {
        console.log("In render Thum ",item);
        return(
          <Col span={4} key={index} style={{marginRight: 20}}>
            <Link
              to={{pathname : `/kanban/${item.url}`,params : {
                  trueUrl : item.trueUrl
                }}}
              onClick={() => {
                localStorage.setItem('url',item.trueUrl+"/columns");
                localStorage.setItem('urlMeta',item.trueUrl);

              }}
            >
            <BoardThum owner={item.by} imgSrc={item.imageId}>
              {item.nameBoard}
            </BoardThum>
            </Link>
          </Col>
        );
      });
    }
  };
  getBoard(url)
  {
    console.log("HEHERER");
    const firebase = require('firebase');
    return firebase.database().ref(url).on('value',(snapshot) =>{
      console.log("=======================> ", snapshot.val());
      let dataBoardNow = this.state.dataBoards;
      // if(dataBoardNow.id)
      let isDuplicate = false;
      let itemDuplicate = null;
       dataBoardNow.map((item,index) => {
        if(item.id === snapshot.val().id)
        {
          isDuplicate = true;
          itemDuplicate = index;
        }

      });
      if(isDuplicate === true)
      {
        const snap = snapshot.val();
        snap.trueUrl = url;
        dataBoardNow[itemDuplicate] = snap;
      }
      if(isDuplicate === false)
      {
        const snap = snapshot.val();
        snap.trueUrl = url;
        dataBoardNow.push(snap);
      }
      this.setState({
        dataBoards : dataBoardNow
      });
    });
  };
  closeAdd = () =>{
    this.setState({
      isAddNew : false
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className={"container_style"}>
        <Divider orientation={"left"}>
          <Icon type="home" theme="filled" style={{marginRight : 10}} />
          Các bảng của {localStorage.getItem('displayName')}
        </Divider>
        <Row style={{height : 300}}>
          {this.renderThumnail()}
        </Row>
        <Divider orientation={"left"}>
          <Icon type="home" theme="filled" style={{marginRight : 10}} />
          Tạo bảng mới
        </Divider>
        <CreateBoard closeModalHandle={() => this.closeAdd()} visible={this.state.isAddNew} />
        <Button type={"primary"} onClick={() => {
          this.setState({isAddNew : true})
        }}>
          Add new Board
        </Button>
      </div>
    );
  };
}

export default ListKanban;