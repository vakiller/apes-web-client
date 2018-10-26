import React from 'react';
import {Card, Button,Icon,Popover, Menu,Input} from 'antd';
import {Droppable} from 'react-beautiful-dnd';
import Task from './task';
import './index.less';
import { OptionColumn } from '../../../constants/';
import {Actions} from "../../../constants";

const _ = require('lodash');
class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: _.toArray(this.props.task),
      newTaskName: '',
      path : this.props.path,
      isAddNewTask : false
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
  deleteTaskHandle = (indexTask,name) =>
  {
    const firebase = require('firebase');
    const tasksNow = this.state.tasks;
    tasksNow.splice(indexTask,1);
    const pathUpdate = this.props.path+'/tasks';
    let updateT = {};
    updateT[pathUpdate] = tasksNow;
    firebase.database().ref().update(updateT);
    firebase.database().ref(localStorage.getItem('urlMeta')+"/logBoard").push(
      localStorage.getItem("displayName")+[Actions[2].name]+name
    );
  };
  actionColumn = (icon) =>
  {
    switch (icon) {
      case "plus" : {
        this.setState({isAddNewTask : true});
        break;
      }
      case "tool" : {
        break;
      }
      case "delete" : {
        this.props.deleteColumnHandle(this.state.path,this.props.column.title);
        break;
      }
    }
  };
  renderAddForm = () =>
  {
    if(this.state.isAddNewTask)
    {
      return(
        <div>
          <Input placeholder={"New Task"} onChange={ (event) => this.handleChangeNewTaskName(event) }  style={{marginBottom: 10}} />
          <Button type={"primary"} onClick={() => this.addNewTaskHandle()}>Add</Button>
        </div>
      );
    }
  };
  addNewTaskHandle = () =>
  {
    const id = Math.random().toString(36).substr(2,9);
    const pathAdd = `${this.props.path}/tasks/${this.state.tasks.length}`;
    this.props.addNewTask(this.state.newTaskName, pathAdd,id);
    this.setState({
      newTaskName : '',
      isAddNewTask : false
    });
  };
  render() {
    const columnOption = (
      <div>
        <Menu>
          {OptionColumn.map((item) => {
            return(
              <Menu.Item key={item.id} onClick={() => this.actionColumn(item.icon)}>
                <Icon type={item.icon}  />
                {item.name}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );

    return (
      <Card
        className={"CardColumn"}
        title={this.props.column.title}
        hoverable={true}
        style={{width :"100%"}}
        extra={(
          <Popover
            title={"Tùy chọn cho cột"}
            placement={"bottom"}
            trigger={["click"]}
            content={columnOption}
          >
            <Icon type="ellipsis" style={{fontSize : 25}} theme="outlined"/>
          </Popover>
            )}
      >
        {this.renderAddForm()}
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.tasks.map((task, index) => {
                const path= this.props.path;
                return <Task
                          path={`${path}/tasks/${index}`}
                          index={index}
                          key={task.id}
                          task={task}
                          deleteTask={(indexTask) => this.deleteTaskHandle(indexTask,task.name)}
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