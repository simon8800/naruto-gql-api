const mongoose = require("mongoose");
const { Schema } = mongoose;

const characterSchema = new Schema({
  name: String,
  summary: String,
  manga: String,
  anime: String,
  novel: String,
  movie: String,
  ova: String,
  appearsIn: String,
  japanese: [String],
  english: [String],
  birthdate: String,
  sex: String,
  status: String,
  height: [String],
  weight: [String],
  bloodType: String,
  kekkeiGenkai: [String],
  tailedBeast: String,
  affiliation: [String],
  team: [String],
  clan: String,
  ninjaRank: [String]
});

const Character = mongoose.model("character", characterSchema);

module.exports = {
  Character
};
