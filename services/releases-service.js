const ReleasesDto = require("../dtos/releases-dto");
const ReleasesModel = require("../models/releases-model");
const ApiError = require("./../exceptions/api-error");

class ReleasesService {
  async getAllReleases() {
    const recentAnimes = await ReleasesModel.RecentAnimes.find();
    const favouriteAnimes = await ReleasesModel.FavouriteAnimes.find();

    return new ReleasesDto({ recentAnimes, favouriteAnimes });
  }

  async addRecentRelease({ titleName, titleCode, choosenEpisode }) {
    const release = await ReleasesModel.RecentAnimes.findOne({ titleCode });

    if (release) {
      throw ApiError.BadRequest(
        `Release with ${titleCode} code already exists`
      );
    }

    await ReleasesModel.RecentAnimes.create({
      titleName,
      titleCode,
      choosenEpisode,
    });
  }

  async addFavoutireRelease({ titleName, titleCode }) {
    const release = await ReleasesModel.FavouriteAnimes.findOne({ titleCode });

    if (release) {
      throw ApiError.BadRequest(
        `Release with ${titleCode} code already exists`
      );
    }

    await ReleasesModel.FavouriteAnimes.create({
      titleName,
      titleCode,
    });
  }

  async deleteRecentRelease({ titleCode, isDeleteAll }) {
    if (isDeleteAll) {
      const releases = await ReleasesModel.RecentAnimes.find();

      if (!releases.length) {
        throw ApiError.BadRequest(`There are no releases to delete`);
      }

      await ReleasesModel.RecentAnimes.deleteMany();
      return;
    }

    const release = await ReleasesModel.RecentAnimes.findOne({
      titleCode,
    });

    if (!release) {
      throw ApiError.BadRequest(
        `Release with ${titleCode} code does not exists`
      );
    }

    await ReleasesModel.RecentAnimes.deleteOne({
      titleCode,
    });
  }

  async deleteFavoutireRelease({ titleCode, isDeleteAll }) {
    if (isDeleteAll) {
      const releases = await ReleasesModel.FavouriteAnimes.find();

      if (!releases.length) {
        throw ApiError.BadRequest(`There are no releases to delete`);
      }

      await ReleasesModel.FavouriteAnimes.deleteMany();
      return;
    }

    const release = await ReleasesModel.FavouriteAnimes.findOne({
      titleCode,
    });

    if (!release) {
      throw ApiError.BadRequest(
        `Release with ${titleCode} code does not exists`
      );
    }

    await ReleasesModel.FavouriteAnimes.deleteOne({
      titleCode,
    });
  }
}

module.exports = new ReleasesService();
