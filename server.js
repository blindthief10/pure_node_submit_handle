const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {

  const urlParsed = url.parse(req.url);
  if (urlParsed.pathname === '/') {
    console.log('Home page');
    res.writeHead(200, {'Content-Type': 'text/html'});
    const readIndex = fs.readFile(path.resolve(__dirname, 'index.html'), (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.write(doc);
        return res.end();
      }
    });
  } else if (urlParsed.pathname === '/contact') {
    console.log('The contact page');
    res.writeHead(200, {'Content-Type': 'text/html'});
    const readIndex = fs.readFile(path.resolve(__dirname, 'contact.html'), (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.write(doc);
        return res.end();
      }
    });
  } else if (urlParsed.pathname === '/receive')  {
    console.log('The form was submitted and parsed!');
    const infoUser = querystring.parse(urlParsed.query);
    // Here you use the infoUser to create and send the email. After that you redirect the user to the /contact
    // Hopefully makes sense.
    res.writeHead(301, {"Content-Type": "text/html", "Location": "http://localhost:3000/contact"});
    res.end();
  }
}).listen(3000)
