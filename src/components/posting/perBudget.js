export const perBudget = (budget, totalMembers) => {
  //console.log(budget, totalMembers);
  return isNaN(Math.floor(parseInt(budget) / parseInt(totalMembers)))
    ? null
    : Math.floor(parseInt(budget) / parseInt(totalMembers));
};
