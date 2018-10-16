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
      .update({ title: cardTitle })
      .then(() => {
        dispatch(changeCardTitle(boardId, cardId, cardTitle));
      });
  };
};
