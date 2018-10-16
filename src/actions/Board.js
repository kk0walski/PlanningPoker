import db from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

export const addBoard = board => ({
  type: "ADD_BOARD",
  payload: board
});

export const justAddBoard = (boardData = {}) => {
  return dispatch => {
    return dispatch(addBoard(boardData));
  };
};

export const startAddBoard = (boardData = {}) => {
  return dispatch => {
    const {
      title = "",
      lists = [],
      users = [],
      user = {},
      color = "blue"
    } = boardData;

    const ref = db.collection("boards").doc();
    const key = ref.id;
    const board = {
      id: key,
      title,
      lists,
      users,
      color
    };
    ref.set(board);
    db.collection("boards")
      .doc(key.toString())
      .collection("users")
      .doc(user.uid.toString())
      .set(user);
  };
};

export const removeBoard = boardId => ({
  type: "DELETE_BOARD",
  payload: {
    boardId
  }
});

export const justRemoveBoard = boardId => {
  return dispatch => {
    return dispatch(removeBoard(boardId));
  };
};

export const startRemoveBoard = ({ boardId } = {}) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId)
      .delete();
  };
};

export const changeBoardTitle = (boardId, title) => ({
  type: "CHANGE_BOARD_TITLE",
  payload: {
    boardTitle: title,
    boardId
  }
});

export const startChangeBoardTitle = (boardId, title) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .update({
        title
      })
      .then(() => {
        dispatch(changeBoardTitle(boardId, title));
      });
  };
};

export const changeBoardColor = (boardId, color) => ({
  type: "CHANGE_BOARD_COLOR",
  payload: {
    boardId,
    color
  }
});

export const startChangeBoardColor = (boardId, color) => {
  return dispatch => {
    db.collection("boards")
      .doc(boardId.toString())
      .update({
        color
      })
      .then(() => {
        dispatch(changeBoardColor(boardId, color));
      });
  };
};

export const addList = list => ({
  type: "ADD_LIST",
  payload: list
});

export const justAddList = (listData = {}) => {
  return dispatch => {
    return dispatch(addList(listData));
  };
};

export const startAddList = (boardId, listTitle) => {
  return dispatch => {
    const boardRef = db.collection("boards").doc(boardId);
    const ref = db
      .collection("boards")
      .doc(boardId)
      .collection("lists")
      .doc();
    const key = ref.id;
    const list = {
      id: key,
      title: listTitle,
      cards: []
    };
    ref.set(list).then(() => {
      boardRef.update({
        lists: firebase.firestore.FieldValue.arrayUnion(key.toString())
      });
    });
  };
};

export const deleteList = (boardId, listId) => ({
  type: "DELETE_LIST",
  payload: {
    boardId,
    listId
  }
});

export const justRemoveList = (boardId, listId) => {
  return dispatch => {
    return dispatch(deleteList(boardId, listId));
  };
};

export const startRemoveList = ({ boardId, listId } = {}) => {
  return dispatch => {
    const boardRef = db.collection("boards").doc(boardId);

    boardRef
      .update({
        lists: firebase.firestore.FieldValue.arrayRemove(listId.toString())
      })
      .then(() => {
        db.collection("boards")
          .doc(boardId)
          .collection("lists")
          .doc(listId)
          .delete();
      });
  };
};
