const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err);
        }
        console.log(data)
    })
}

async function webCat(url) {
    let res = await axios.get(`${url}`)
    console.log(res.data)
}

let arg = process.argv[2]

if (arg.slice(0, 4) === 'http') {
    webCat(arg);
} else {
    cat(arg);
}