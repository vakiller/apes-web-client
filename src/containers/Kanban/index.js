import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initialData';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './column';
import './index.css';

const firebase = require('firebase/app');
const _ = require('lodash');

class KanBan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {newdata: null};
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
  }

  componentDidMount() {
    const firebase = require('firebase');
    firebase.auth().signInAnonymously().catch(err => alert(err));
    firebase.database().ref('/boards/board1/columns').on('value', snapshot => {
      console.log(snapshot.val());
      this.setState({newdata: _.toArray(snapshot.val())})
    });
  };

  addNewTaskHandle = (nameTask, content) => {
    const firebase = require('firebase');
    firebase.database().ref('/boards/board1/columns/0/tasks').push({
      id: nameTask,
      content: content
    });
  }
  renderPage = () => {
    if (this.state.newdata !== null) {
      console.log("2222 new Data ", this.state.newdata);
      return (
        <DragDropContext
          onDragEnd={this.onDragEnd}>
          {this.state.newdata.map(thiscolumn => {
            // const columnId = column.id;
            // const thisColumn = column.columnId
            const thistask = thiscolumn.tasks;
            console.log(thistask);
            return <Column addNewTask={(nameTask, Content) => this.addNewTaskHandle(nameTask, Content)}
                           key={thiscolumn.id} column={thiscolumn} task={thistask}/>;
          })
            // const tasks = columnId.tasks;
            // console.log(tasks);
          }
        </DragDropContext>
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