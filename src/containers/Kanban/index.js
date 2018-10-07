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
    this.state = {newdata: null, path: ''};
  };

  onDragEnd = result => {
    console.log(" ========> After Drag And Drop", result);
    const {destination, source, draggableId} = result;
    if (!destination) {
      return null;
    }
    if ((destination.droppableId === source.droppableId) && destination.index === source.index) {
      return;
    }
    if ((destination.droppableId === source.droppableId) && destination.index !== source.index) {
      const ColumnChange = destination.droppableId;
      this.state.newdata.map(column => {
        if (column.id === ColumnChange) {
          const tasksArray = _.toArray(column.tasks);
          const taskChanged = tasksArray[source.index];
          tasksArray.splice(source.index, 1);
          tasksArray.splice(destination.index, 0, taskChanged);
          console.log(`/boards/board1/columns/${ColumnChange}/tasks`);
          var updateT = {};
          updateT[`/boards/board1/columns/${ColumnChange}/tasks`] = tasksArray;
          return firebase.database().ref().update(updateT);
        }
      });
    }
    if (destination.droppableId !== source.droppableId) {
      console.log("in hrere  ...........");
      const ColumnLostId = source.droppableId;
      const ColumnHaveId = destination.droppableId;
      let taskChanged;
      this.state.newdata.map(column => {
        if(column.id === ColumnLostId)
        {
          const taskLost = _.toArray(column.tasks);
          taskChanged = taskLost[source.index];
          taskLost.splice(source.index,1);
          console.log(`/boards/board1/columns/${ColumnLostId}/tasks`);
          var updateT = {};
          updateT[`/boards/board1/columns/${ColumnLostId}/tasks`] = taskLost;
          return firebase.database().ref().update(updateT);
        }


      });
      this.state.newdata.map( column => {
        if(column.id === ColumnHaveId)
        {
          const taskHave = _.toArray(column.tasks);
          console.log(`/boards/board1/columns/${ColumnHaveId}/tasks`);
          taskHave.splice(destination.index,0,taskChanged);
          var updateT = {};
          updateT[`/boards/board1/columns/${ColumnHaveId}/tasks`] = taskHave;
          return firebase.database().ref().update(updateT);
        }
      });

    }
  };

  componentDidMount() {
    const firebase = require('firebase');
    firebase.auth().signInAnonymously().catch(err => alert(err));
    firebase.database().ref('/boards/board1/columns').on('value', snapshot => {
      this.setState({newdata: _.toArray(snapshot.val())})
    });
  };

  addNewTaskHandle = (nameTask, content, path, id) => {
    const firebase = require('firebase');
    let TaskContent = {};
    TaskContent.name = nameTask;
    TaskContent.content = content;
    TaskContent.id = id;
    firebase.database().ref(path).set(TaskContent);
  };
  deleteColumnHandle = (pathDelete) => {
    const firebase = require('firebase');
    firebase.database().ref(pathDelete).remove();
  };
  renderPage = () => {
    if (this.state.newdata !== null) {
      return (
        <Row>
          <DragDropContext
            onDragEnd={this.onDragEnd}>
            {this.state.newdata.map((thiscolumn, index) => {
              // const columnId = column.id;
              // const thisColumn = column.columnId
              const thistask = thiscolumn.tasks;
              console.log(thistask);
              return (
                <Col key={thiscolumn.id} span={7}>
                  <Column
                    addNewTask={(nameTask, Content, path, id) => this.addNewTaskHandle(nameTask, Content, path, id)}
                    key={thiscolumn.id} index={index} column={thiscolumn}
                    path={`/boards/board1/columns/${thiscolumn.id}`} task={thistask}
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