import database from "../../../../infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;


  //cast no banco de dados ::
  const databaseOpenConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity;");
  const databaseOpenConnectionsValue = databaseOpenConnectionsResult.rows[0].count;

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
