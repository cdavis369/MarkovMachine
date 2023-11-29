/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    let chains = new Object();



    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      if (!this.chains.hasOwnProperty(this.words[i])) 
        this.chains[this.words[i]] = [];
      if (i + 1 === this.words.length)
        this.chains[this.words[i]].push(null);
      else
        this.chains[this.words[i]].push(this.words[i+1]);
    }

  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let key = this.randomWord();
    let i = Math.floor(Math.random() * this.chains[key].length);
    let word = this.chains[key][i];
    let res = "";
    while (word != null) {
      if (numWords === 0) {
        word = null;
      }
      else {
        key = word;
        i = Math.floor(Math.random() * this.chains[key].length);
        word = this.chains[key][i];
        if (word != null)
          res += `${word} `;
      }
      numWords -= 1;
    }

    return `${res.trimEnd()}.`;
  }

  randomWord() {
    const keys = Object.keys(this.chains);
    const i = Math.floor(Math.random() * keys.length);
    return keys[i];
  }
}

module.exports = MarkovMachine;
