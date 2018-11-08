const Labels = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LABEL": {
      const { boardId, id, text, color, cards } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [id]: {
            id,
            text,
            color,
            cards
          }
        }
      };
    }
    case "SET_LABELS": {
      const { boardId, labels } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...labels
        }
      };
    }
    case "CHANGE_LABEL_TEXT": {
      const { boardId, labelId, labelText } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [labelId]: {
            ...state[boardId][labelId],
            text: labelText
          }
        }
      };
    }
    case "CHANGE_LABEL_COLOR": {
      const { boardId, labelId, labelColor } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [labelId]: {
            ...state[boardId][labelId],
            color: labelColor
          }
        }
      };
    }
    case "DELETE_CARD_FROM_LABEL": {
      const { boardId, labelId, cardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          [labelId]: {
            ...state[boardId][labelId],
            cards: state[boardId][labelId].cards.filter(card => card !== cardId)
          }
        }
      };
    }
    default:
      return state;
  }
};

export default Labels;
