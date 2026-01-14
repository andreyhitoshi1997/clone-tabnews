const calculadora = require("models/calculadora");

test("Somar 2 + 2, deve retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 5 + 100, deve retonar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100, deve retonar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});

test("Deve validar receber valores nulos ", () => {
  const resultado = calculadora.somar();
  expect(resultado).toBe("Erro");
});
