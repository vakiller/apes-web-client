import React from 'react';
import {Card, Button, Input, Row, Col} from 'antd';
import {Droppable} from 'react-beautiful-dnd';
import Task from './task';

const _ = require('lodash');

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: _.toArray(this.props.task),
      newTaskName: null,
      newTaskContent: null,
      path : this.props.path
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.task !== this.props.task) {
      this.setState({
        tasks: _.toArray(this.props.task)
      });
    }
  };

  handleChangeNewTaskName = (event) => {
    this.setState({newTaskName: event.target.value})
  };
  handleChangeNewTaskContent = (event) => {
    this.setState({newTaskContent: event.target.value})
  };
  deleteTaskHandle = (indexTask) =>
  {
    const firebase = require('firebase');
    const tasksNow = this.state.tasks;
    tasksNow.splice(indexTask,1);
    const pathUpdate = this.props.path+'/tasks';
    let updateT = {};
    updateT[pathUpdate] = tasksNow;
    firebase.database().ref().update(updateT);
  };
  render() {
    console.log(" ssadds", this.props.path);
    return (
      <Card
        style={{width: '100%'}}
        title={this.props.column.title}
      >
        <Button type="danger" style={{marginBottom : 20}} onClick={() => this.props.deleteColumnHandle(this.state.path)} >
          Delete Column
        </Button>

        <Row style={{marginBottom: 20}}>
          <Col span={8} style={{marginRight: 10}}>
            <Input size="large" placeholder="New Name Task" onChange={(event) => this.handleChangeNewTaskName(event)}/>
          </Col>
          <Col span={15}>
            <Input size="large" placeholder="Content" onChange={(event) => this.handleChangeNewTaskContent(event)}/>
          </Col>

        </Row>
        <Button style={{marginBottom: 20}} type="primary"
                onClick={() => this.props.addNewTask(this.state.newTaskName, this.state.newTaskContent,this.state.path)}>
          Add New Task
        </Button>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.tasks.map((task, index) => {
                console.log("sadsdsadsadas", task);
                const path= this.props.path;
                return <Task
                          style={{padding: 10}}
                          path={`${path}/tasks/${index}`}
                          index={index}
                          key={task.id}
                          task={task}
                          deleteTask={(indexTask) => this.deleteTaskHandle(indexTask)}
                />
              })}
              {provided.placeholder}
            </div>
          )
          }
        </Droppable>
      </Card>
    );

  }
};
export default Column;