import React from 'react';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

class Task extends React.Component 
{
    render()
    {
        console.log(this.props.task);
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index} >
                {(provided) => (
                        <div 
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                            <Card title={this.props.task.id} style={{ width: 300 }} >
                                {this.props.task.content}
                            </Card>
                        </div>
                    )
                }
    
            </Draggable>
        );
    }
    

};
export default Task;