const sqlite3 = require('sqlite3').verbose();

function getDb() {
  return new sqlite3.Database('./database/db');
}

module.exports = {
  getDb,
  updateStatus(id, status, url, callback) {
    const db = getDb();
    const date = + new Date();
    db.run(`INSERT INTO status(siteId, status, date) VALUES (${id}, ${status}, ${date})`, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${url} site changed status to ${status}`);
      callback(status);
    });
    db.close();
  }

};



