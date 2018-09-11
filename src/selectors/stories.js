// import moment from 'moment';
// get visible expenses
// export default (expenses, {text, sortBy, startDate, endDate}) => {
//   return expenses.filter((expense) => {
//     const createdAtMoment = moment(expense.createdAt);
//     const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
//     const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
//     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
//
//     return startDateMatch && endDateMatch && textMatch;
//   }).sort((a, b) => {
//     if(sortBy === 'date'){
//       return a.createdAt < b.createdAt ? 1 : -1;
//     } else if(sortBy === 'amount'){
//       return a.amount < b.amount ? 1 : -1;
//     }
//   });
// };

export default (stories, {text}) => {
  return stories.filter((story) => {
    // const createdAtMoment = moment(expense.createdAt);
    // const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    // const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textTitleMatch = story.title.toLowerCase().includes(text.toLowerCase());
    const textTagMatch = story.tags[0].toLowerCase().includes(text.toLowerCase());
    // return startDateMatch && endDateMatch && textMatch;
    return textTitleMatch || textTagMatch;

  })
  // .sort((a, b) => {
  //   if(sortBy === 'date'){
  //     return a.createdAt < b.createdAt ? 1 : -1;
  //   } else if(sortBy === 'amount'){
  //     return a.amount < b.amount ? 1 : -1;
  //   }
  // })
  ;
};
