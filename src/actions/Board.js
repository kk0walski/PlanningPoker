import db from "../../firebase/firebase";

export const addBoard = board => ({
  type: "ADD_BOARD",
  payload: board
});

export const startAddBoard = (boardData = {}) => {
  return dispatch => {
    const { title = "", lists = [], users = {}, color = "blue" } = boardData;

    const ref = db.collection("boards").doc();
    const key = ref.id;
    const board = {
      id: key,
      title,
      lists,
      users,
      color
    };
    return ref.set(board).then(() => {
      dispatch(
        addBoard({
          ...board
        })
      );
    });
  };
};
