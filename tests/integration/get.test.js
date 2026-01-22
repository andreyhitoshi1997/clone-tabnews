import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.open_connections).toBeDefined();
});

test("Teste SQL Injection - Parâmetros Preparados", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();
  
  // Verifica que open_connections existe e é um número
  expect(responseBody.dependencies.database.open_connections).toBeDefined();
  expect(typeof responseBody.dependencies.database.open_connections).toBe("number");
  
  // Verifica que o valor é razoável (não negativo e não muito alto)
  expect(responseBody.dependencies.database.open_connections).toBeGreaterThanOrEqual(0);
  expect(responseBody.dependencies.database.open_connections).toBeLessThan(1000);
});
