const fs = require('fs');
const { Character } = require('../models/Character');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGOURL

let characters = fs.readFileSync('./seed/cleanCharacters.json', 'utf-8');

characters = JSON.parse(characters);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

async function seedCharacters(characters) {
  for (let character of characters) {
    try {
      let newChar = await Character.create(character);
      console.log(newChar)
    } catch (e) {
      console.log(e.message);
      continue;
    }
  }
}

seedCharacters(characters)
  .then(() => {
    mongoose.disconnect();
  })