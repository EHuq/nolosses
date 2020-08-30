import { firestoreAction } from 'vuexfire';
import db from '../db';

const state = {
  users: [],
};
const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', db.collection('users'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
