import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initialData';
import {DragDropContext} from 'react-beautiful-dnd';
import {Button, Col, Row} from 'antd';
import AddNewColumn from '../../components/addNewColumn/addNewColumn';
import Column from './column';
import './index.css';

const firebase = require('firebase/app');
const _ = require('lodash');

class KanBan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {newdata: null,path : ''};
  };

  onDragEnd = result => {
    console.log(result);
    const {destination, source, draggableId} = result;
    if (!destination) {
      return null;
    }
    if ((destination.droppableId === source.droppableId) && destination.index === source.index) {
      return;
    }

    console.log("Drag Ended ", this.state.newdata);
    const ColumnChange = destination.droppableId;
    console.log("cc", ColumnChange);
    this.state.newdata.map(column => {
      console.log("fifsfss", column);
      if (column.id === ColumnChange) {
        const tasksArray = _.toArray(column.tasks);
        const taskChanged = tasksArray[source.index];
        tasksArray.splice(source.index, 1);
        tasksArray.splice(destination.index, 0, taskChanged);
        console.log("new task ", tasksArray);
        var updateT = {};
        updateT['/boards/board1/columns/0/tasks'] = tasksArray;
        return firebase.database().ref().update(updateT);
      }
    });
    // var updates = {};
    //     updates['/boards/board1/'] = newState;
    //     return firebase.database().ref().update(updates);
  };

  componentDidMount() {
    const firebase = require('firebase');
    firebase.auth().signInAnonymously().catch(err => alert(err));
    firebase.database().ref('/boards/board1/columns').on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({newdata: _.toArray(snapshot.val())})
    });
  };

  addNewTaskHandle = (nameTask, content,path) => {
    const firebase = require('firebase');
    console.log("333333 path Add Here ====>",path);
    firebase.database().ref(path+'/tasks').push({
      id: nameTask,
      content: content
    });
  };
  deleteColumnHandle = (pathDelete) => {
    const firebase = require('firebase');
    firebase.database().ref(pathDelete).remove();
  };
  renderPage = () => {
    if (this.state.newdata !== null) {
      console.log("2222 new Data ", this.state.newdata);
      return (
        <Row>
          <DragDropContext
            onDragEnd={this.onDragEnd}>
            {this.state.newdata.map(thiscolumn => {
              // const columnId = column.id;
              // const thisColumn = column.columnId
              console.log("ListColumn ========>  ", thiscolumn);
              const thistask = thiscolumn.tasks;
              console.log(thistask);
              return(
              <Col span={7}>
                <Column addNewTask={(nameTask, Content,path) => this.addNewTaskHandle(nameTask, Content,path)}
                        key={thiscolumn.id} column={thiscolumn} path={`/boards/board1/columns/${thiscolumn.id}`} task={thistask}
                        deleteColumnHandle={(pathDelete) => this.deleteColumnHandle(pathDelete)}
                />;
              </Col>);

            })
              // const tasks = columnId.tasks;
              // console.log(tasks);
            }
          </DragDropContext>
          <Col span={2}>
            <div style={{marginTop: 70, marginLeft: 50, marginRight: 50}}>
              <AddNewColumn path={'/boards/board1/columns'}/>
            </div>
          </Col>
        </Row>
      );
    }
    else {
      return "Data is loading";
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  };
}

export default KanBan;