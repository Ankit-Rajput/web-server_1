//diff b/w app.use & .get
// https://stackoverflow.com/questions/15601703/difference-between-app-use-and-app-get-in-express-js


const express= require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials'); // partials files added
  // in all the pages

const port = process.env.PORT || 3000;
app.use((req,res,next)=>{   // this whole to save time to server.log
  var now=new Date().toString();
  var log=`${now} : ${req.method} ${req.url}`;

console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
    if(err){
      console.log('unable to append');
    }
  });
next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

//here above we did not call next() so nothing will work after this uncomment them


app.get('/', (req,res)=>{
     res.send("Hello !");
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    ptitle: 'AboUt'
  });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'bad req!!!!!!'
    });
});
app.listen(port,()=>{
  console.log(`app is up on port ${port}`);
});
