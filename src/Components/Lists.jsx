import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import ListAdder from "./ListAdder";
import { startMoveList } from "../actions/Board";
import { startMoveCard } from "../actions/Lists";

class InnerList extends React.PureComponent {
  render() {
    const { list, cardMap, boardId, listsOrder, index } = this.props;
    var cards;
    if (cardMap) {
      cards = list.cards.map(cardId => cardMap[cardId]);
    } else {
      cards = [];
    }
    return (
      <List
        key={list.id}
        list={list}
        boardId={boardId}
        cards={cards}
        listsOrder={listsOrder}
        index={index}
      />
    );
  }
}

class Lists extends Component {
  static propTypes = {
    listsOrder: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    cards: PropTypes.object,
    lists: PropTypes.object
  };

  handleDragEnd = ({ source, destination, type }) => {
    if (!destination) {
      return;
    }
    const { listsOrder, lists, boardId } = this.props;
    //Move List
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        const listsData = {
          oldListIndex: source.index,
          newListIndex: destination.index,
          boardId: source.droppableId,
          myLists: listsOrder
        };
        this.props.startMoveList(listsData);
      }
      return;
    }
    // Move Card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      const cardsData = {
        boardId,
        oldCardIndex: source.index,
        newCardIndex: destination.index,
        sourceListId: source.droppableId,
        destListId: destination.droppableId
      };
      this.props.startMoveCard(lists, cardsData);
    }
  };

  render() {
    const { boardId, listsOrder, lists, cards } = this.props;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId={boardId} direction="horizontal" type="COLUMN">
          {provided => (
            <div>
              <div
                className="lists"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listsOrder &&
                  lists &&
                  listsOrder.map((listId, index) => {
                    const list = lists[listId];
                    if (list) {
                      if (list.visible) {
                        return (
                          <InnerList
                            list={list}
                            cardMap={cards}
                            index={index}
                            boardId={boardId}
                            listsOrder={listsOrder}
                            key={list.id}
                          />
                        );
                      } else {
                        return null;
                      }
                    } else {
                      return <p>Loading...</p>;
                    }
                  })}
                {provided.placeholder}
                <ListAdder boardId={boardId} listsOrder={listsOrder} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listsOrder, boardId } = ownProps;
  return {
    boardId,
    listsOrder,
    cards: state.Cards[boardId],
    lists: state.Lists[boardId]
  };
};

const mapDispatchToProps = dispatch => ({
  startMoveList: listsData => dispatch(startMoveList(listsData)),
  startMoveCard: (lists, cardData) => dispatch(startMoveCard(lists, cardData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
