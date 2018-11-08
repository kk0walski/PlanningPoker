import db from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

export const addLabel = label => ({
  type: "ADD_LABEL",
  payload: label
});

export const justAddLabel = (labelData = {}) => {
  return dispatch => {
    return dispatch(addLabel(labelData));
  };
};

export const startAddLabel = (labelData = {}) => {
  return dispatch => {
    const { boardId = 0, labelColor = "", labelText = "" } = labelData;

    const boardRef = db.collection("boards").doc(boardId.toString());
    const labelsRef = boardRef.collection("labels").doc();
    const key = labelsRef.id;
    const label = {
      id: key,
      text: labelText,
      color: labelColor
    };
    labelsRef.set(label);
  };
};

export const changeLabelText = (boardId, labelId, labelText) => ({
  type: "CHANGE_LABEL_TEXT",
  payload: {
    boardId,
    labelId,
    labelText
  }
});

export const startChangeLabelText = (boardId, labelId, labelText) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("labels")
      .doc(labelId.toString())
      .update({
        text: labelText
      });
  };
};

export const changeLabelColor = (boardId, labelId, labelColor) => ({
  type: "CHANGE_LABEL_COLOR",
  payload: {
    boardId,
    labelId,
    labelColor
  }
});

export const startChangeLabelColor = (boardId, labelId, labelColor) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("labels")
      .doc(labelId.toString())
      .update({
        color: labelColor
      });
  };
};

export const deleteCardFromLabel = (boardId, labelId, cardId) => ({
  type: "DELETE_CARD_FROM_LABEL",
  payload: {
    boardId,
    labelId,
    cardId
  }
});

export const startDeleteCardFromLabel = (boardId, labelId, cardId) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("labels")
      .doc(labelId.toString())
      .update({
        cards: firebase.firestore.FieldValue.arrayRemove(cardId.toString())
      });
  };
};

export const addCardToLabel = (boardId, labelId, cardId) => ({
  type: "ADD_CARD_TO_LABEL",
  payload: {
    boardId,
    labelId,
    cardId
  }
});

export const startAddCardToLabel = (boardId, labelId, cardId) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("labels")
      .doc(labelId.toString())
      .update({
        cards: firebase.firestore.FieldValue.arrayUnion(cardId.toString())
      });
  };
};

export const deleteLabel = (boardId, labelId) => ({
  type: "DELETE_LABEL",
  payload: {
    boardId,
    labelId
  }
});

export const startDeleteLabel = (boardId, labelId) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .collection("labels")
      .doc(labelId.toString())
      .delete();
  };
};
