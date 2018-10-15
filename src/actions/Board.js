import db from "../firebase/firebase";

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
