import {
  validBetweenDate,
  validPassword,
  validCi,
  validOptionsSurvey,
  validDateTimeGreater,
  validDateGreater,
  validDateLess,
  validDateFuture,
  validNumberGreater,
} from "./rulesApp";

export const validators = {
  betweenDate: validBetweenDate,
  password: validPassword,
  ci: validCi,
  optionSurvey: validOptionsSurvey,
  greaterDate: validDateGreater,
  lessDate: validDateLess,
  futureDate: validDateFuture,
  greaterNumber: validNumberGreater,
  greaterDateTime: validDateTimeGreater,
  // Añadir otros validadores aquí
};
