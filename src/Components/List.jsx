import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import ListHeader from "./ListHeader";
import classnames from "classnames";
import CardAdder from "./CardAdder";
import Cards from "./Cards";
class List extends React.Component {
  render = () => {
    const { list, boardId, listsOrder, cards, index } = this.props;
    return (
      <Draggable draggableId={list.id} index={index}>
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="list-wrapper"
            >
              <div
                className={classnames("list", {
                  "list--drag": snapshot.isDragging
                })}
              >
                <ListHeader
                  dragHandleProps={provided.dragHandleProps}
                  listTitle={list.title}
                  listId={list.id}
                  boardId={boardId}
                  listsOrder={listsOrder}
                />
                <div className="cards-wrapper">
                  <Cards
                    listTitle={list.title}
                    listId={list.id}
                    boardId={boardId}
                    cards={cards}
                  />
                </div>
              </div>
              <CardAdder list={list} boardId={boardId} />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { list, boardId, listsOrder, cards, index } = ownProps;
  return {
    list,
    boardId,
    listsOrder,
    cards,
    index
  };
};

export default connect(mapStateToProps)(List);
