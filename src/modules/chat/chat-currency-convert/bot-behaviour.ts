const usdAndCop = [
  {
    message:
      "<p>Seleccione una de las siguientes opciones (Solamente el número de opción):<br>" +
      "1. Convertir de pesos a dólares<br>" +
      "2. Convertir de dólares a pesos" +
      "</p>",
    expected: (value: string) => {
      return ["1", "2"].includes(value);
    },
  },
  {
    message:
      "<p>Ingrese el valor a convertir (Puede usar ',' para separar miles " +
      "y '.' para los decimales, o un número entero) " +
      "</p>",
    expected: (value: string) => {
      const valueConverted = value.replace(new RegExp(`[,]`, "g"), "");
      const number = parseFloat(valueConverted);
      return !isNaN(number);
    },
  },
  {
    message: (option: string) => {
      let textValues = "";
      if (option === "1") {
        textValues =
          `<strong>Monto en Pesos a convertir:</strong> {value1}<br>` +
          `<strong>Valor convertido a Dólares:</strong> {value2}`;
      }

      if (option === "2"){
        textValues =
        `<strong>Monto en Dólares a convertir:</strong> {value1}<br>` +
        `<strong>Valor convertido a Pesos:</strong> {value2}`;
      }

      return "<p>Resultado:<br></br>" + `${textValues}` + "</p>";
    },
    currency:["COP","USD"]
  },
];

export const steps = { usdAndCop };
