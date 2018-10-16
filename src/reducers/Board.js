const Board = (state = [], action) => {
  switch (action.type) {
    case "ADD_BOARD": {
      const {
        id,
        title,
        lists,
        archuveLists = [],
        users,
        color = "blue"
      } = action.payload;
      return {
        ...state,
        [id]: {
          id,
          title,
          lists,
          archuveLists,
          users,
          color,
          archive: {}
        }
      };
    }
    case "SET_LISTS": {
      const { boardId, listsOrder } = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: listsOrder
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
          archuveLists: [...state.archuveLists, newListId]
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
