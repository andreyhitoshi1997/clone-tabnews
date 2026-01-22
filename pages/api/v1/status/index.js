import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  let databaseVersionValue;
  let databaseMaxConnectionsValue;
  let databaseOpenConnectionsValue;

  try {
    const databaseVersionResult = await database.query("SHOW server_version;");
    databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
    databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    
    // Usando parâmetros preparados para prevenir SQL injection
    const databaseOpenConnectionsResult = await database.query(
      "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      [databaseName]
    );
    databaseOpenConnectionsValue = databaseOpenConnectionsResult.rows[0].count;
  } catch (error) {
    console.error("Database query error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
    return;
  } finally {
    // Cleanup ou logging adicional pode ser feito aqui
    console.log("Status endpoint accessed at:", updatedAt);
  }

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        open_connections: databaseOpenConnectionsValue
      },
    },
  });
}

export default status;
