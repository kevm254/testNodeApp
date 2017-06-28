const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || '3000';

// middleware
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('getTacos', () => {
   return 'here are some tacos';
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.use((req, res, next)=> {
   let now = new Date().toString();
   let request = `${now}: ${req.method} ${req.url}`;
   console.log(request);
   fs.appendFile('server.log', request + '\n', (err) => {
       if (err) {
           console.log('There was an error. Unable to write to file system');
       }
   })
   next();
});

// app.use((req,res, next) => {
//     res.render('maintenance.hbs');
// });


// routes
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
    res.send('hi there');
});

app.get('/home', (req, res)=> {
   res.render('home.hbs', {
       pageTitle: 'The Page Title'
   })
});

app.get('/bad', (req, res) => {
    res.send();
});

app.get('/projects', (req, res) => {
   let data = {
       pageTitle: 'This is the new page title'
   };

    res.render('projects.hbs', data);
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'whaattt'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs')
});

app.get('/about/:test', ()=> {

});


app.listen(port, ()=> {
    console.log(`running on port ${port}`);
});

