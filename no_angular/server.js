//Les imports
const express = require('express');
const app = express();
const fs = require('fs');

//La config (ejs pour fonctionner sans angular, c'est un moteur de template)
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//get initial d'ejs

app.get('/',(req,res)=>{
    res.render('track.ejs');
});

//GET
app.get('/api/getState',(req,res)=>{
  fs.readFile('./stockage/saveState.txt','utf8',(err,data)=>{
    if(err) {
      console.log(`Error when reading file: ${err}`);
      res.writeHead(500);
      res.write(`Error when reading file: ${err}`);
      res.end();
    }
    const responseJson = JSON.parse(data);
    res.json({responseJson});
  });
});

//POST
app.post('/api/saveState',(req,res)=>{
    const objStorage = req.body;
    console.log(objStorage);
    fs.writeFile('./stockage/saveState.txt',JSON.stringify(objStorage),(err, data)=>{
                        if(err) {
                            console.log(`Error when writing file: ${err}`)
                            res.writeHead(500);
                            res.write(`Error when writing file: ${err}`);
                            res.end();
                        }
                    });

    res.json({objStorage});
});

//listen port
app.listen(3000);


// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const server = http.createServer((req,res)=>{
//     if(req.method === "POST") {
//         let datas = '';

//         req.on('data',(d)=>{
//             datas+=d;
//         });

//         req.on('end',()=>{
//             datas = JSON.parse(datas);
//             console.log(datas);
//             fs.writeFile('savedCryptoTrack.txt',formatDataForText(datas),(err, data)=>{
//                 if(err) {
//                     console.log(`Error when writing file: ${err}`)
//                 }
//             });
//         });

//     } else {
//         getPage(res);
//     }

  
// });


// server.listen(port,(err)=>{
//     if(err) {
//         console.log("Erreur "+err); 
//     } else {
//         console.log(`Serveur is listening on port ${port}`);
//     }
// });

// function getPage(res) {
//     res.writeHead(200, { 'Content-Type': 'text/html'});
//     fs.readFile("track.html",(err,data) => {
//         if(err){
//             res.writeHead(404);
//             res.write('Error: File not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }

// function formatDataForText(datas) {
//     let txt = `Date          Bitcoin    Cardano    Ethereum \n`;
//     for(let i = 0; i< datas.length;i++){
//         console.log(datas[i]);
//         txt+= `${datas[i].date}    ${datas[i].bitcoin}        ${datas[i].cardano}        ${datas[i].ethereum} \n`
//     }
       
//     return txt;
// }