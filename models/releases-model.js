const { Schema, model } = require("mongoose");

const RecentAnimesSchema = new Schema({
  titleName: { type: String, required: true },
  titleCode: { type: String, unique: true, required: true },
  choosenEpisode: { type: String, required: true },
});

const FavouriteAnimesSchema = new Schema({
  titleName: { type: String, required: true },
  titleCode: { type: String, unique: true, required: true },
});

module.exports = {
  RecentAnimes: model("RecentAnimes", RecentAnimesSchema),
  FavouriteAnimes: model("FavouriteAnimes", FavouriteAnimesSchema),
};
