import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initialData';
import {DragDropContext} from 'react-beautiful-dnd';
import {Button, Col, Row} from 'antd';
import AddNewColumn from '../../../components/addNewColumn/addNewColumn';
import Column from './column';
import HeaderLayout from './headerInfo/headerInfo';
import {Actions} from '../../../constants';
import './index.less';

const firebase = require('firebase/app');
const _ = require('lodash');

class KanBan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {newdata: null,
      path: '',
      urlNow : '',
      metaData : {},
      urlMeta : ''
    };
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
          // taskChanged.id = `${destination.droppableId}.${destination.index}`;
          tasksArray.splice(source.index, 1);
          tasksArray.splice(destination.index, 0, taskChanged);
          var updateT = {};
          updateT[`${localStorage.getItem('url')}/${ColumnChange}/tasks`] = tasksArray;
          console.log("SOurce ",taskChanged);
            firebase.database().ref(localStorage.getItem('urlMeta')+"/logBoard").push(
              localStorage.getItem("displayName")+[Actions[5].name]+taskChanged.name
            );
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
          console.log(`${localStorage.getItem('url')}/${ColumnLostId}/tasks`);
          var updateT = {};
          updateT[`${localStorage.getItem('url')}/${ColumnLostId}/tasks`] = taskLost;
          return firebase.database().ref().update(updateT);
        }


      });
      this.state.newdata.map( column => {
        if(column.id === ColumnHaveId)
        {
          const taskHave = _.toArray(column.tasks);
          taskChanged.id = Math.random().toString(36).substr(2,9);
          console.log(`${localStorage.getItem('url')}/${ColumnHaveId}/tasks`);
          taskHave.splice(destination.index,0,taskChanged);
          var updateT = {};
          updateT[`${localStorage.getItem('url')}/${ColumnHaveId}/tasks`] = taskHave;
          firebase.database().ref(localStorage.getItem('urlMeta')+"/logBoard").push(
            localStorage.getItem("displayName")+" đã di chuyển task "+taskChanged.name+[Actions[6].name]
          );
          return firebase.database().ref().update(updateT);

        }
      });

    }
  };

  componentDidMount() {
    console.log("sca ",this.props);
    const firebase = require('firebase');
        firebase.database().ref(localStorage.getItem('urlMeta')).on('value',snapshot => {
          console.log("In hereeeeee ",snapshot.val());
          this.setState({
            metaData : snapshot.val()
          })
        });
        firebase.database().ref(localStorage.getItem('url')).on('value', snapshot => {
          console.log("In hereeeeee 1",snapshot.val());
          this.setState({newdata: _.toArray(snapshot.val())})
        });


  };

  addNewTaskHandle = (nameTask,path, id) => {
    console.log(nameTask,path,id);
    const firebase = require('firebase');
    let TaskContent = {};
    TaskContent.name = nameTask;
    TaskContent.id = id;
    firebase.database().ref(path).set(TaskContent);
    firebase.database().ref(localStorage.getItem("urlMeta")+"/logBoard").push(
      localStorage.getItem("displayName")+[Actions[1].name]+nameTask
    );
  };
  deleteColumnHandle = (pathDelete,name) => {
    const firebase = require('firebase');
    firebase.database().ref(pathDelete).remove();
    firebase.database().ref(localStorage.getItem('urlMeta')+"/logBoard").push(
      localStorage.getItem("displayName")+[Actions[4].name]+name
    );
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
              return (
                <Col key={thiscolumn.id} span={5} style={{margin : 10}} >
                  <Column
                    addNewTask={(nameTask,path, id) => this.addNewTaskHandle(nameTask,path, id)}
                    key={thiscolumn.id} index={index} column={thiscolumn}
                    path={`${localStorage.getItem('url')}/${thiscolumn.id}`} task={thistask}
                    deleteColumnHandle={(pathDelete,name) => this.deleteColumnHandle(pathDelete,name)}
                  />;
                </Col>);

            })
              // const tasks = columnId.tasks;
              // console.log(tasks);
            }
          </DragDropContext>
          <Col span={2}>
            <div style={{margin : 20}}>
              <AddNewColumn path={localStorage.getItem('url')}/>
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
    console.log("STATEEEEEE ",this.state);
    return (
      <div style={{backgroundImage : `url(${this.state.metaData.imageId})`,backgroundSize : 'cover',backgroundPosition : 'center',height : '100vh'}} >
        <HeaderLayout urlNow={this.state.urlMeta} dataBoardNow={this.state.metaData}/>
        <div style={{marginTop : 70}}>

          {this.renderPage()}
        </div>
        </div>
    );
  };
}
export default KanBan;