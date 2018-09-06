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
      pText = ''
    } = storyData;
    const story = { title, tags, colors, pText};

    return database.ref('users/' + uid + '/stories').push(story).then((ref) => {
      dispatch(addStory({
        id: ref.key,
        ...story
      }));
    });
  };
};


// REMOVE_EXPENSE
export const removeStory = ({ id } = {}) => ({
  type: 'REMOVE_STORY',
  id
});

export const startRemoveStory = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/stories/${id}`).remove().then(() => {
      dispatch(removeStory({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editStory = (id, updates) => ({
  type: 'EDIT_STORY',
  id,
  updates
});

export const startEditStory = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'  + uid + '/stories/' + id).update(updates).then(() => {
      dispatch(editStory(id, updates));
    });
  };
};

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
