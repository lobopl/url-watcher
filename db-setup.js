const db = require('./db').getDb();

const defaultSites = [
  'https://google.pl',
  'https://wykop.pl'
];

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS site (id INTEGER PRIMARY KEY AUTOINCREMENT, url STRING UNIQUE)');
  db.run('CREATE TABLE IF NOT EXISTS status (id INTEGER PRIMARY KEY AUTOINCREMENT, siteId, date INTEGER, status INTEGER)');
  defaultSites.forEach((url) => {
    db.run(`INSERT INTO site(url) VALUES ('${url}')`, (err) => {
      console.log(err);
    });
  });
});

db.each('SELECT id, url FROM site', (err, row) => {
  console.log(row.id, row, err);
});


db.close();
