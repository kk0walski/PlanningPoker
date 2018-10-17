const Lists = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { boardId, id, title, cards, visible } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [id]: {
            id,
            title,
            cards,
            visible
          }
        }
      };
    }
    case "ADD_CARD": {
      const { id, boardId, listId } = action.payload;
      if (listId) {
        return {
          ...state,
          [boardId]: {
            ...state[boardId],
            [listId]: {
              ...state[boardId][listId],
              cards: [...state[boardId][listId].cards, id]
            }
          }
        };
      } else {
        return state;
      }
    }
    case "MOVE_CARD": {
      const {
        boardId,
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[boardId][sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [boardId]: {
            ...state[boardId],
            [sourceListId]: { ...state[boardId][sourceListId], cards: newCards }
          }
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[boardId][sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[boardId][destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [sourceListId]: {
            ...state[boardId][sourceListId],
            cards: sourceCards
          },
          [destListId]: {
            ...state[boardId][sourceListId],
            cards: destinationCards
          }
        }
      };
    }
    case "CHANGE_LIST_NAME": {
      const { boardId, listId, listTitle } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [listId]: {
            ...state[boardId][listId],
            title: listTitle
          }
        }
      };
    }
    case "ARCHIVE_LIST": {
      const { boardId, listId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [listId]: {
            ...state[boardId][listId],
            visible: false
          }
        }
      };
    }
    case "DELETE_CARD": {
      const { boardId, cardId: newCardId, listId } = action.payload;
      if (listId) {
        return {
          ...state,
          [boardId]: {
            ...state[boardId],
            [listId]: {
              ...state[boardId][listId],
              cards: state[boardId][listId].cards.filter(
                cardId => cardId !== newCardId
              )
            }
          }
        };
      } else {
        return state;
      }
    }
    case "DELETE_BOARD": {
      const { boardId } = action.payload;
      const { [boardId]: deleteBoard, ...restOfBoards } = state;
      return restOfBoards;
    }
    default: {
      return state;
    }
  }
};

export default Lists;
