/* import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'gitano',
    database: 'inpaco',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

  const getConnection = async () => {
    return await pool.getConnection();
};

export default getConnection; */

/* import mysql from 'mysql2/promise';

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'gitano',
      database: 'inpaco'
    });

    console.log('Conexión a la base de datos establecida');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

export default connect; */