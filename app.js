const urlmon = require('url-monitor');
const {getDb, updateStatus} = require('./db');
const db = getDb();



db.each('SELECT id, url FROM site', (err, site) => {
  if (err) {
    return;
  }
  db.get(`SELECT * FROM status WHERE siteId=${site.id} ORDER BY id DESC`, (error, status) => {
    if (error) {
      console.log(error);
      return;
    }
    let lastStatus = status ? parseInt(status.status, 10) : null;

    const website = new urlmon({
      url: site.url,
      interval: 5000,
      timeout: 3000
    });

    website.on('error', (data) => {
      console.log(data, 'error');
    });

    website.on('available', (data) => {
      if (lastStatus !== 1) {
        updateStatus(site.id, 1, site.url, (status) => {
          lastStatus = status;
        })
      }
    });

    website.on('unavailable', (data) => {
      if (lastStatus !== 0) {
        updateStatus(site.id, 0, site.url, (status) => {
          lastStatus = status;
        })
      }
    });

    website.start();
  });


});


db.close();

