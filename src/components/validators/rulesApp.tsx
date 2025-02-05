import { GMT } from "@/mk/utils/date";
import { ValidFunctionType } from "@/mk/utils/validate/Rules";

const formatDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const validBetweenDate: ValidFunctionType = (value, param) => {
  const [start, end] = param.map((date) => new Date(date));
  start.setHours(start.getHours() - GMT);
  end.setHours(end.getHours() - GMT);

  // const formatDate = (date: Date) =>
  //   `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return new Date(value) < start || new Date(value) > end
    ? `Debe estar entre ${formatDate(start)} y ${formatDate(end)}`
    : "";
};

export const validDateGreater: ValidFunctionType = (
  value,
  param,
  field = {}
) => {
  let date = new Date(value);
  let hoy = new Date();
  if (param && param[0]) {
    hoy = new Date(field ? field[param[0]] : "");
  }
  date.setHours(date.getHours() - GMT);
  hoy.setHours(hoy.getHours() - GMT);
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return date >= hoy ? "" : "La fecha no debe ser menor a " + formatDate(hoy);
};

export const validDateLess: ValidFunctionType = (value, param, field = {}) => {
  let date = new Date(value);
  let hoy = new Date();
  if (param && param[0]) {
    hoy = new Date(field ? field[param[0]] : "");
  }

  date.setHours(date.getHours() - GMT);
  hoy.setHours(hoy.getHours() - GMT);
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return date <= hoy ? "" : "La fecha no debe ser mayor a" + formatDate(hoy);
};

export const validPassword: ValidFunctionType = (value, param) => {
  let [min, max]: any = param;
  if (!min) min = 4;
  if (!max) max = 10;
  const error =
    "La contraseña debe tener entre " + min + " y " + max + " caracteres";
  return value.length < min || value.length > max ? error : "";
};

export const validCi: ValidFunctionType = (value, param) => {
  let [min, max]: any = param;
  if (!min) min = 5;
  if (!max) max = 11;
  const error = "El CI debe tener entre " + min + " y " + max + " numeros";
  return value.length < min || value.length > max || isNaN(value) ? error : "";
};

export const validOptionsSurvey: ValidFunctionType = (value, param, field) => {
  let error: string = "";
  let min = 1;
  if (field?.nresp) min = field.nresp;
  if (field?.max) min = field.max;

  if (value.length <= min) return "Debe tener más de " + min + " opciones";

  value.forEach((option: any) => {
    if (!option.name) error = "Todas las opciones deben tener un valor";
  });
  return error;
};
