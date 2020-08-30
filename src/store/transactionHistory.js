import { firestoreAction } from 'vuexfire';
import firebase from '../firebase';
// import getTimeSince from '../utilities/getTimeSince';
import db from '../db';

const transactions = db.collection('transactions');

const getters = {
  transactionsGetter: (state) => {
    if (state.transactions) {
      return state.transactions[0];
    }
    return {};
  },
};

const state = {
  transactions: [],
};

/* eslint-enable */
const actions = {
  init: firestoreAction(({ bindFirestoreRef }, userId) => {
    /* eslint-disable */
    /* eslint-enable */
    bindFirestoreRef('transactions', transactions.where('user_id', '==', userId));
  }),
  /* eslint-disable camelcase */

  async delete(context, transaction_id) {
    await transactions.doc(transaction_id).delete();
  },
  /* eslint-enable */

  async create(context, transaction) {
    const result = transactions.doc();

    /* eslint-disable */
    const uid = firebase.auth().currentUser.uid;

    transaction.id = result.id;
    transaction.user_id = uid;
    transaction.created_at = firebase.firestore.FieldValue.serverTimestamp();
    transaction.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    /* eslint-enable */

    try {
      // const userInfo = await db
      //   .collection('users')
      //   .doc(uid)
      //   .get();
      // const { lastAction, actionCounter } = userInfo.data();

      await transactions.doc(transaction.id).set(transaction);

      // if (actionCounter < 4) {
      //   const timeSince = getTimeSince(lastAction);
      //   if (timeSince > 30) {
      //     await transactions.doc(transaction.id).set(transaction);
      //     if (timeSince > 3600) {
      //       await db
      //         .collection('users')
      //         .doc(uid)
      //         .update({
      //           actionCounter: 1,
      //           lastAction: firebase.firestore.FieldValue.serverTimestamp(),
      //         });
      //     } else {
      //       await db
      //         .collection('users')
      //         .doc(uid)
      //         .update({
      //           actionCounter: 0,
      //           // firebase.firestore.FieldValue.increment(1),
      //           lastAction: firebase.firestore.FieldValue.serverTimestamp(),
      //         });
      //     }
      //   } else {
      //     alert("You're doing too many things too quickly!");
      //   }
      // } else {
      //   alert("You're doing too many things too quickly!");
      // }
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
