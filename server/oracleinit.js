function generateConnectionProps() {
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

module.exports = generateConnectionProps;