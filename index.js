const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  port: 5432,
  database: "testdb",
});

async function execute() {
  try {
    await client.connect();
    console.log("Connected successfully.");
    const version = await client.query("select version()");
    console.table(version.rows);
    const { rows } = await client.query("select * from member");

    if (rows.length >= 1) {
      await client.query("delete from member");
    }
    await client.query("insert into member values (1, 'john')");
    const result = await client.query("select * from member");
    console.table(result.rows);
  } catch (ex) {
    console.log(`Something wrong happend ${ex}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully.");
  }
}
