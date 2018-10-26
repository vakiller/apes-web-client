import React from 'react';
import {Card, Row, Col, Button} from 'antd';
import {Draggable} from 'react-beautiful-dnd';
import ModalEdit from '../../../components/editTaskForm/editTaskForm';

class Task extends React.Component {
  state = {
    editModalVisible: false
  };
  closeAddHandler = (isClosed) => {
    this.setState({editModalVisible: isClosed})
  };
  render() {
    return (
      <div>
        <Draggable draggableId={this.props.task.id} index={this.props.index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Card title={this.props.task.name} style={{width: '100%'}}>
                {this.props.task.content}
              </Card>

              <ModalEdit nameNow={this.props.task.name}
                         contentNow={this.props.task.content}
                         visible={this.state.editModalVisible}
                         setVisible={() => this.setState({ editModalVisible : false })}
                         path={this.props.path}
              />
            </div>
          )
          }

        </Draggable>
        <Button
                icon={"edit"}
                onClick={() => {
                  this.setState({editModalVisible: true});
                }}
        />
        <Button type="danger"
                icon={"delete"}
                onClick={() => {
                  this.props.deleteTask(this.props.index);
                }}
        />

      </div>
    );
  }


};
export default Task;