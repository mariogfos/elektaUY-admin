import {
  validBetweenDate,
  validPassword,
  validCi,
  validOptionsSurvey,
  validDateGreater,
  validDateLess,
} from "./rulesApp";

export const validators = {
  betweenDate: validBetweenDate,
  password: validPassword,
  ci: validCi,
  optionSurvey: validOptionsSurvey,
  greaterDate: validDateGreater,
  lessDate: validDateLess,
  // Añadir otros validadores aquí
};
