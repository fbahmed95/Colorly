import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addStory = (story) => ({
  type: 'ADD_STORY',
  story
});

export const startAddStory = (storyData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      tags = [],
      colors = [],
    } = storyData;
    const story = { title, tags, colors};

    return database.ref('users/' + uid + '/stories').push(story).then((ref) => {
      dispatch(addStory({
        id: ref.key,
        ...story
      }));
    });
  };
};

// // REMOVE_EXPENSE
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id
// });
//
// export const startRemoveExpense = ({ id } = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref('users/' + uid + '/expenses' + id).remove().then(() => {
//       dispatch(removeExpense({ id }));
//     });
//   };
// };
//
// // EDIT_EXPENSE
// export const editExpense = (id, updates) => ({
//   type: 'EDIT_EXPENSE',
//   id,
//   updates
// });
//
// export const startEditExpense = (id, updates) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref('users/'  + uid + '/expenses/' + id).update(updates).then(() => {
//       dispatch(editExpense(id, updates));
//     });
//   };
// };
//
// SET_EXPENSES
export const setStories = (stories) => ({
  type: 'SET_STORIES',
  stories
});

export const startSetStories = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/' + uid + '/stories').once('value').then((snapshot) => {
      const stories = [];

      snapshot.forEach((childSnapshot) => {
        stories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setStories(stories));
    });
  };
};
