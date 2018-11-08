import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import CardModal from "./CardModal";
import CardDetailModal from "./CardWindow";
import { FaPencilAlt } from "react-icons/fa";
import CardBadges from "./CardBadges";
import { findCheckboxes } from "../utils";
import CardLabels from "./CardLabels";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      active: false,
      isModalOpen: false,
      isDetailOpen: false
    };
  }

  toggleCardEditor = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  toggleDetailEditor = () => {
    this.setState({ isDetailOpen: !this.state.isDetailOpen });
  };

  toggleCardDetailsEditor = () => {
    this.setState({ isDetailOpen: !this.state.isDetailOpen });
  };

  handleClick = event => {
    const { tagName, checked, id } = event.target;
    if (tagName.toLowerCase() === "input") {
      // The id is a string that describes which number in the order of checkboxes this particular checkbox has
      this.toggleCheckbox(checked, parseInt(id, 10));
    } else if (tagName.toLowerCase() !== "a") {
      this.toggleCardEditor(event);
    }
  };

  handleKeyDown = event => {
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== "a") {
      event.preventDefault();
      this.toggleCardEditor();
    }
  };

  handleMouseEnter() {
    this.setState({ active: true });
  }

  handleMouseLeave() {
    this.setState({ active: false });
  }

  render() {
    const {
      card,
      index,
      listId,
      labels,
      boardId,
      listTitle,
      isDraggingOver
    } = this.props;
    const { active, isModalOpen, isDetailOpen } = this.state;
    const cardDescription = card.description ? card.description : "";
    const checkboxes = findCheckboxes(cardDescription);
    if (card) {
      return (
        <div>
          <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
              <div>
                <div
                  className={classnames("list-card", {
                    "card-title--drag": snapshot.isDragging,
                    "active-card": active
                  })}
                  ref={ref => {
                    provided.innerRef(ref);
                    this.ref = ref;
                  }}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    background: card.color
                  }}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <span
                    className={classnames("list-card-operation", "icon-sm")}
                    onClick={event => {
                      //provided.dragHandleProps.onMouseDown(event);
                      this.handleClick(event);
                    }}
                    onKeyDown={event => {
                      provided.dragHandleProps.onKeyDown(event);
                      this.handleKeyDown(event);
                    }}
                  >
                    <FaPencilAlt />
                  </span>
                  <div onClick={this.toggleCardDetailsEditor}>
                    <div className="card-title-html">{card.title}</div>
                    {/* eslint-enable */}
                    {(card.date || checkboxes.total > 0) && (
                      <CardBadges
                        date={
                          card.date.seconds
                            ? new Date(card.date.seconds * 1000)
                            : card.date
                        }
                        checkboxes={checkboxes}
                      />
                    )}
                    <CardLabels cardId={card.id} labels={labels} />
                  </div>
                </div>
                {/* Remove placeholder when not dragging over to reduce snapping */}
                {isDraggingOver && provided.placeholder}
              </div>
            )}
          </Draggable>
          <CardModal
            isOpen={isModalOpen}
            cardElement={this.ref}
            card={card}
            listId={listId}
            labels={labels}
            boardId={boardId}
            checkboxes={checkboxes}
            toggleCardEditor={this.toggleCardEditor}
          />
          <CardDetailModal
            isOpen={isDetailOpen}
            cardElement={this.ref}
            card={card}
            listId={listId}
            labels={labels}
            boardId={boardId}
            listTitle={listTitle}
            toggleCardEditor={this.toggleCardDetailsEditor}
          />
        </div>
      );
    } else {
      return <p>LOADING....</p>;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  boardId: ownProps.boardId,
  card: ownProps.card,
  listId: ownProps.listId,
  listTitle: ownProps.listTitle,
  labels: state.Labels[ownProps.boardId]
    ? Object.values(state.Labels[ownProps.boardId])
    : []
});

export default connect(mapStateToProps)(Card);
