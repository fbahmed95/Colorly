// Stories Reducer
const storiesReducerDefaultState = [];
export default (state = storiesReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_STORY':
      return [
        ...state,
        action.story
      ];
    // case 'REMOVE_EXPENSE':
    //   return state.filter(({id}) => id !== action.id);
    // case 'EDIT_EXPENSE':
    //   return state.map((expense) => {
    //     if(expense.id === action.id){
    //       return {
    //         ...expense,
    //         ...action.updates
    //       }
    //     } else {
    //       return expense;
    //     }
    //   });
    case 'SET_STORIES':
      return action.stories;
    default:
      return state;
  }
};
