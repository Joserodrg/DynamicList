import { createServer } from 'node:http';
import * as mysql from 'mysql2';

const PORT = 5000;

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',     
  user: 'root',          
  password: '00reset',  
  database: 'db_list' 
});
  
// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }

  console.log('Conectado a la base de datos');
});





const server = createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log({ method: req.method, url: req.url });




// OPTIONS
if (req.method === 'OPTIONS') {
  res.writeHead(204,);
  res.end();

  return;
}




// GET  
  if (req.method === 'GET' && req.url === '/items') {
    connection.query('SELECT * FROM items', function (error, results, fields) {
      res.writeHeader(200,);
      res.end(JSON.stringify(results, null, 2));
    });

    return;
  }





// POST
  if (req.method === 'POST' && req.url === '/items') {
    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const { item } = JSON.parse(body);
        connection.query('INSERT INTO items (name) VALUES (?)', [item], (error, results) => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, id: results.insertId }));
        });
    });
}






});
// starts a simple http server locally on port 5000
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

