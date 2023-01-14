module.exports = class ReleasesDto {
  recentAnimes;
  favouriteAnimes;

  constructor(model) {
    console.log(model);
    this.recentAnimes = model.recentAnimes;
    this.favouriteAnimes = model.favouriteAnimes;
  }
};
