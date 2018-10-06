import React from 'react';
import { Card,Button,Input,Row,Col } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';
const _ = require('lodash');

class Column extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tasks : _.toArray(this.props.task) ,
            newTaskName : null,
            newTaskContent : null    
        };  
    };
    componentDidUpdate(prevProps,prevState,snapshot)
    {
        if(prevProps.task !== this.props.task)
        {
            this.setState({
                tasks : _.toArray(this.props.task)
            });
        }
    };
    handleChangeNewTaskName = (event) =>
    {
        this.setState({newTaskName : event.target.value})
    }
    handleChangeNewTaskContent = (event) =>
    {
        this.setState({ newTaskContent : event.target.value })
    }
    render() {
        console.log(" ssadds",this.props.task);
        return (
                <Card
                    style={{ width: 400, marginTop: 10 }}
                    title={this.props.column.title}
                >
                    <Row style={{marginBottom : 20}}>
                        <Col span={8} style={{marginRight : 10}} >
                            <Input size="large" placeholder="New Name Task" onChange={ (event) => this.handleChangeNewTaskName(event) } />
                        </Col>
                        <Col span={15} >
                            <Input size="large" placeholder="Content" onChange={ (event) => this.handleChangeNewTaskContent(event) } />
                        </Col>
                        
                    </Row>
                    <Button style={{marginBottom : 20}} type="primary" onClick={ () => this.props.addNewTask(this.state.newTaskName,this.state.newTaskContent) } >
                            Add New Task
                        </Button>
                    <Droppable droppableId={this.props.column.id} >
                        {(provided) => (
                            <div 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                 {this.state.tasks.map((task, index) => {
                                    console.log("sadsdsadsadas",task);
                                    return <Task style={{ padding: 10 }} index={index} key={task.id} task={task} /> 
                                } )}
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