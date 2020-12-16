const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;

let generateConnectionProps = () => {
  const connectString = `
  (DESCRIPTION=
    (ADDRESS=
      (PROTOCOL=TCP)
      (HOST=cis550proj.cgn43zyqcysl.us-east-1.rds.amazonaws.com)
      (PORT=1521)
    )
    (CONNECT_DATA=
      (SID=BOOKSDB)
      )
    )`;

  return {
    user: "admin",
    password: "welovesusan",
    connectString: connectString
  }
}

async function runQuery(query, callback) {
//   if (_debugMode) console.log(`oracledb running query: ${query}`);
  let connection;
  let result;
  const connectionProps = generateConnectionProps();

  try {
    connection = await oracledb.getConnection(connectionProps);
    result = await connection.execute(query);
  } catch (err) {
    console.error(err);
    return -1;
  } finally {
    if (connection) {
      try {
        await connection.close();
        callback(result);
      } catch (err) {
        console.error(err);
        return -1;
      }
    }
  }
}

module.exports = runQuery;