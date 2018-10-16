import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    if (
      this.props.cards !== undefined &&
      this.props.cards[this.props.cards.length - 2] ===
        prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { listId, listTitle, cards, boardId } = this.props;

    return (
      <Droppable droppableId={listId}>
        {(provided, { isDraggingOver }) => (
          <div>
            <div className="cards" ref={provided.innerRef}>
              {cards !== undefined &&
                cards.map((card, index) => {
                  if (card) {
                    return (
                      <Card
                        isDraggingOver={isDraggingOver}
                        key={card.id}
                        boardId={boardId}
                        card={card}
                        index={index}
                        listTitle={listTitle}
                        listId={listId}
                      />
                    );
                  } else {
                    return <p key={-1}>LOADING...</p>;
                  }
                })}
              {provided.placeholder}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.listEnd = el;
                }}
              />
            </div>
          </div>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cards, listId, boardId } = ownProps;
  return {
    boardId,
    cards,
    listId
  };
};

export default connect(mapStateToProps)(Cards);
