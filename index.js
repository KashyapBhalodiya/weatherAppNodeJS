// API : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const http = require('http');
const fs = require('fs');
var requests = require('requests');

// get all the data into out backend file
const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempval, orgval) => {
    let temparature = tempval.replace("{%tempval%}", orgval.main.temp);
    temparature = temparature.replace("{%tempmin%}", orgval.main.temp_min);
    temparature = temparature.replace("{%tempmax%}", orgval.main.temp_max);
    temparature = temparature.replace("{%location%}", orgval.name);
    temparature = temparature.replace("{%country%}", orgval.sys.country);
    temparature = temparature.replace("{%tempstatus%}", orgval.weather[0].main);
    return temparature;
};

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("4a4debee5fe79235282cdb9b33727239", { streaming })
        .on("data", (chunk) => {
            // make the data into JSON format
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData.map((val) => replaceVal(homeFile, val));
            res.write(realTimeData);
        })
        .on("end", (err) => {
            if (err)
                return console.log("Connection closed due to error", err);
            res.end();
        });
    }
});

server.listen(8000, "127.0.0.1");