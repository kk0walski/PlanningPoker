import db from "../firebase/firebase";

export const changeCardTitle = (boardId, cardId, cardTitle) => ({
  type: "CHANGE_CARD_TITLE",
  payload: {
    boardId,
    cardId,
    cardTitle
  }
});

export const startChangeCardTitle = (boardId, cardId, cardTitle) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .doc(cardId.toString())
      .update({
        title: cardTitle
      })
      .then(() => {
        dispatch(changeCardTitle(boardId, cardId, cardTitle));
      });
  };
};

export const changeCardColor = (boardId, cardId, color) => ({
  type: "CHANGE_CARD_COLOR",
  payload: {
    boardId,
    cardId,
    color
  }
});

export const startChangeCardColor = (boardId, cardId, color) => {
  return dispatch => {
    return db
      .collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .doc(cardId.toString())
      .update({
        color
      })
      .then(() => {
        dispatch(changeCardColor(boardId, cardId, color));
      });
  };
};

export const archiveCard = (boardId, cardId) => ({
  type: "ARCHIVE_CARD",
  payload: {
    boardId,
    cardId
  }
});

export const justArchiveCard = (boardId, cardId) => {
  return dispatch => {
    return dispatch(archiveCard(boardId, cardId));
  };
};

export const startArchiveCard = ({ boardId, cardId } = {}) => {
  return dispatch => {
    const cardRef = db
      .collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .doc(cardId.toString());

    cardRef
      .update({
        visible: false
      })
      .then(() => {
        dispatch(justArchiveCard(boardId, cardId));
      });
  };
};

export const changeCardDescription = (boardId, cardId, cardDescription) => ({
  type: "CHANGE_CARD_DESCRIPTION",
  payload: {
    boardId,
    cardId,
    cardDescription
  }
});

export const startChangeCardDescription = (
  boardId,
  cardId,
  cardDescription
) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .doc(cardId.toString())
      .update({
        description: cardDescription
      })
      .then(() => {
        dispatch(changeCardTitle(boardId, cardId, cardDescription));
      });
  };
};

export const changeCardDate = (boardId, cardId, newDate) => ({
  type: "CHANGE_CARD_DATE",
  payload: {
    boardId,
    cardId,
    date: newDate
  }
});

export const startChangeCardDate = (boardId, cardId, newDate) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("cards")
      .doc(cardId.toString())
      .update({
        date: newDate
      })
      .then(() => {
        dispatch(changeCardDate(boardId, cardId, newDate));
      });
  };
};
