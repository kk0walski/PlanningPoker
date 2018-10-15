const Board = (state = [], action) => {
  switch (action.type) {
    case "ADD_BOARD": {
      const { id, title, lists, users, color = "blue" } = action.payload;
      return {
        ...state,
        [id]: {
          id,
          title,
          lists,
          users,
          color,
          archive: {}
        }
      };
    }
    case "SET_LISTS": {
      const { boardId, listsOrder, listsKey } = action.payload;
      console.log("REDUCER SETTING LISTS: ", action.payload);
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: listsOrder,
          listsKey
        }
      };
    }
    case "CHANGE_BOARD_TITLE": {
      const { boardTitle, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          title: boardTitle
        }
      };
    }
    case "CHANGE_BOARD_COLOR": {
      const { boardId, color } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          color
        }
      };
    }
    case "MOVE_LIST": {
      const { oldListIndex, newListIndex, boardId } = action.payload;
      const newLists = Array.from(state[boardId].lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return {
        ...state,
        [boardId]: { ...state[boardId], lists: newLists }
      };
    }
    case "DELETE_LIST": {
      const { listId: newListId, boardId } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter(listId => listId !== newListId),
          archive: {
            ...state[boardId].archive,
            lists: {
              ...state[boardId].archive.lists,
              newListId
            }
          }
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

export default Board;
