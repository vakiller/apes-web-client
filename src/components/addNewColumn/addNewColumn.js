import React from 'react';
import {Button, Row, Col, Popover} from 'antd';

class PopoverAddNewColumn  extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      path : this.props.path,
      newColumnName : null
    };
  }
  addNewHandle = () =>
  {
    const firebase = require('firebase');
    let newColumn = {};
    newColumn.title = this.state.newColumnName;
    var newRef = firebase.database().ref(this.state.path);
    newRef.push(newColumn).then((snap) => {
      newColumn.id = snap.key;
      const PathNow = this.state.path+'/'+snap.key;
      firebase.database().ref(PathNow).set(newColumn);
    });
  };
  newNameHandle = (event) =>
  {
    this.setState(
      {
        newColumnName : event.target.value
      }
    );
  };
  render()
  {
    const Content = (
      <Row>
        <Col span={20} >
          <input width='100%' onChange={ (event) => this.newNameHandle(event) } value={this.state.newColumnName} placeholder="Name New Column" />
        </Col>
        <Col span={1} style={{float : 'left'}} >
          <Button size="small" type="primary" onClick={() => this.addNewHandle()} >
            Add
          </Button>
        </Col>
      </Row>
    );
    return(
      <Popover style={{width : 'auto'}} content={Content}>
        <Button type="primary"  shape="circle" icon="plus" size="large" />
      </Popover>
    );
  };
};
export default PopoverAddNewColumn;