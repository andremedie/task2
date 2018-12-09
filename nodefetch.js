var express = require('express');
var fs = require('fs');
const fetch = require('node-fetch');
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');
data = fs.readFileSync('weather.json');
weatherList = JSON.parse(data);
console.log(weatherList);
var list = {};

// Sätter en 0.2 sekunders delay på att få fram svaret - detta för att koden ska hinna läsas in innan svaret kommer fram.
app.use( ( req, res, next ) => {
    setTimeout(next, 200 );
  });

//läser in min information på index sidan. 
app.get('/', function(request, response){
    return response.render('index', list);
});

//här läser det in css och bild - fräscht!
    app.use(express.static('css'));

// Läser in formen till mitt projekt.
    app.get('/getform', function(request, response){
        return response.render('get_forms', list)
     });
// Detta är vad formen kommer att göra, skriva ut information helt enkelt.
     app.get('/getformBack', function(request, response){
        var data = request.query
        var n = data.name
        ggData(n);
        return response.redirect('back');
        
    });
//Hämtar in Väder API'n och skriver ut exakt det som jag vill att den ska skriva ut på index sidan.
            ggData = async function(stad){
              const urll = "http://api.openweathermap.org/data/2.5/weather?q="+stad+"&appid=d7ece5ce9d067035dec2e756f1368dfb";
            
              try {
                  const response = await fetch(urll);
                  const json = await response.json();
            
                  list["temp"] = (json.main.temp-273).toFixed(0);
                  list["temp2"] = (json.main.temp-270).toFixed(0);
                  list["lon"] = json.coord.lon;
                  list["lat"] = json.coord.lat;
                  list["name"] = json.name;
                  list["description"] = json.weather[0].description;
            
                  console.log(list);
              } catch (error) {
                  console.log(error);
              }
            } 

//standard kod för att öppna upp localhost, yes sir. Skriv in nodemon nodefetch.js i terminal så körs koden igång :D
app.listen(3000, listening);
    function listening(){
       console.log("listening . . .");
    } 

