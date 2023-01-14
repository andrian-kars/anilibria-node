const ReleasesDto = require("../dtos/releases-dto");
const ReleasesModel = require("../models/releases-model");

class ReleasesService {
  async getAllReleases() {
    const recentAnimes = await ReleasesModel.RecentAnimes.find();
    const favouriteAnimes = await ReleasesModel.FavouriteAnimes.find();

    return new ReleasesDto({ recentAnimes, favouriteAnimes });
  }
}

module.exports = new ReleasesService();
