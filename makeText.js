/** Command-line tool to generate Markov text. */
const MarkovMachine = require('./markov');
const fs = require('fs');
const axios = require('axios');
const args = process.argv;


if (args[2] == 'file') {
    const file = args[3];
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err.message);
            process.exit(1);
        }
        console.log(Markovify(data));
    });
}
else {
    const URL = args[3];
    webCat(URL);
}



async function webCat(URL) {
    try {
        const response = await axios.get(URL, {responseType: 'text'});
        console.log(Markovify(response.data));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

function Markovify(text) {
    let mm = new MarkovMachine(text);
    return mm.makeText();
}
