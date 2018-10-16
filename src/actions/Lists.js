import db from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

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
      .update({
        title: listTitle
      })
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

export const startAddCard = (boardId, list, newTitle) => {
  return dispatch => {
    const { id } = list;
    const boardRef = db.collection("boards").doc(boardId.toString());
    const listRef = boardRef.collection("lists").doc(id.toString());
    const ref = boardRef.collection("cards").doc();
    const key = ref.id;
    const card = {
      id: key,
      title: newTitle
    };
    ref.set(card).then(() => {
      listRef.update({
        cards: firebase.firestore.FieldValue.arrayUnion(key.toString())
      });
    });
  };
};

export const startMoveCard = (lists, cardsData = {}) => {
  return dispatch => {
    const {
      boardId,
      oldCardIndex,
      newCardIndex,
      sourceListId,
      destListId
    } = cardsData;
    if (sourceListId === destListId) {
      const listRef = db
        .collection("boards")
        .doc(boardId.toString())
        .collection("lists")
        .doc(sourceListId.toString());

      return db.runTransaction(transaction => {
        return transaction.get(listRef).then(listDoc => {
          if (!listDoc.exists) {
            throw new Error("Document does not exist!");
          }
          const testCards = listDoc.data().cards;
          if (
            JSON.stringify(testCards) ===
            JSON.stringify(lists[sourceListId].cards)
          ) {
            const [removedCard] = testCards.splice(oldCardIndex, 1);
            testCards.splice(newCardIndex, 0, removedCard);
            transaction.update(listRef, {
              cards: testCards
            });
          } else {
            throw new Error("Cards not match");
          }
        });
      });
    } else {
      const sourceListRef = db
        .collection("boards")
        .doc(boardId.toString())
        .collection("lists")
        .doc(sourceListId.toString());
      const destListRef = db
        .collection("boards")
        .doc(boardId.toString())
        .collection("lists")
        .doc(destListId.toString());
      return db.runTransaction(transaction => {
        return transaction.get(destListRef).then(listDoc => {
          if (!listDoc.exists) {
            throw new Error("Document does not exist!");
          }
          const testCards = listDoc.data().cards;
          if (
            JSON.stringify(testCards) ===
            JSON.stringify(lists[destListId].cards)
          ) {
            const removedCard = lists[sourceListId].cards[oldCardIndex];
            testCards.splice(newCardIndex, 0, removedCard);
            transaction.update(destListRef, {
              cards: testCards
            });
            sourceListRef.update({
              cards: firebase.firestore.FieldValue.arrayRemove(
                removedCard.toString()
              )
            });
          } else {
            throw new Error("Cards not match");
          }
        });
      });
    }
  };
};
