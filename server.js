var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if(page == '/'){
        res.write('Vous êtes à l\'accueil');
    }
    else if (page == '/Contact')    {
        res.write('Vous êtes sur la page contact');
    }
    else if (page == '/Affichage/1/user'){
        res.write('Afficher l\'utilisateur qui a 1\' id 1 !');
    }
    else {
        res.write('Erreur 404 Not Found');
    }
    res.end();
  //res.writeHead(200,{"Content-Type": "text/html"});
 // res.end('<html>' +'<head>' +'<meta charset="utf-8">' +'<title>Ma page Node.js</title>' +'</head>' +'<body>'  +'<p>Voici un paragraphe <strong>HTML</strong> !</p>' +'</body>' +'</html>');
});
server.listen(8081);