export const perBudget = (budget, totalMembers) => {
  //console.log(budget, totalMembers);
  return isNaN(Math.ceil(parseInt(budget) / parseInt(totalMembers)))
    ? null
    : Math.ceil(parseInt(budget) / parseInt(totalMembers));
};
