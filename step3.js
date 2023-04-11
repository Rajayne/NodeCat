const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let arg;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  arg = process.argv[4];
} else {
  arg = process.argv[2];
}

if (arg.slice(0, 4) === 'http') {
  webCat(arg, out);
} else {
  cat(arg, out);
}