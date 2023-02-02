import { countComma } from "../../utils/editedData";

export const perBudget = (budget, totalMembers) => {
  return isNaN(Math.floor(parseInt(budget) / parseInt(totalMembers)))
    ? null
    : countComma(Math.floor(parseInt(budget) / parseInt(totalMembers)));
};
