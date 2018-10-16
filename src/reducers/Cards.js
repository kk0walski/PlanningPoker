const Cards = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { boardId, id, title, description } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [id]: {
            id,
            title,
            description
          }
        }
      };
    }
    case "CHANGE_CARD_TITLE": {
      const { boardId, cardId, cardTitle } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [cardId]: {
            ...state[boardId][cardId],
            title: cardTitle
          }
        }
      };
    }
    case "CHANGE_CARD_DESCRIPTION": {
      const { boardId, cardId, cardDescription } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [cardId]: {
            ...state[boardId][cardId],
            description: cardDescription
          }
        }
      };
    }
    case "CHANGE_CARD_DATE": {
      const { boardId, cardId, date } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [cardId]: {
            ...state[boardId][cardId],
            date
          }
        }
      };
    }
    case "CHANGE_CARD_COLOR": {
      const { boardId, cardId, color } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [cardId]: {
            ...state[boardId][cardId],
            color
          }
        }
      };
    }
    case "DELETE_CARD": {
      const { boardId, cardId } = action.payload;
      const {
        [boardId]: { [cardId]: deleteCard, ...restOfCards }
      } = state;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          restOfCards
        }
      };
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

export default Cards;
