import db from "../firebase/firebase";

export const changeListName = (boardId, listId, listTitle) => ({
  type: "CHANGE_LIST_NAME",
  payload: {
    boardId,
    listId,
    listTitle
  }
});

export const startChangeListName = (boardId, listId, listTitle) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("lists")
      .doc(listId.toString())
      .update({ title: listTitle })
      .then(() => {
        dispatch(changeListName(boardId, listId, listTitle));
      });
  };
};

export const addCard = card => ({
  type: "ADD_CARD",
  payload: card
});

export const justAddCard = (cardData = {}) => {
  return dispatch => {
    return dispatch(addCard(cardData));
  };
};
