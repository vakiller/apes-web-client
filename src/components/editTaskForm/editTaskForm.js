import React from 'react';
import {Modal, Input ,Button} from 'antd';

class ModalEdit extends React.Component {
  state = { visible: false, nameNow : this.props.nameNow, contentNow : this.props.contentNow };
  handleOk = (e) => {
    const firebase = require('firebase');
    console.log(e);
    // let updateT = {};
    let updateT = {
      name : this.state.nameNow,
      content : this.state.contentNow
    };
    firebase.database().ref(this.props.path).update(updateT);
    this.setState({
      visible: false,
    });

    this.props.setVisible(false)
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevState.visible) {
      this.setState({
        visible: this.props.visible
      });
    }
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.props.setVisible(false)
  };
  newNameChange = (event) => {
    this.setState({nameNow : event.target.value})
  };
  newContentChange = (event) => {
    this.setState({contentNow : event.target.value})
  };
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input onChange={ (event) => this.newNameChange(event) } value={this.state.nameNow} placeholder="New Name" />
          <Input onChange={ (event) => this.newContentChange(event) } value={this.state.contentNow} placeholder="New Content" />
        </Modal>
      </div>
    );
  }
}
export default ModalEdit;