const releasesService = require("../services/releases-service");
const ApiError = require("./../exceptions/api-error");

class ReleasesController {
  recentType = "recent";
  favouriteType = "favourite";

  async getReleases(req, res, next) {
    try {
      const releases = await releasesService.getAllReleases();
      return res.json(releases);
    } catch (e) {
      next(e);
    }
  }

  addRelease = async (req, res, next) => {
    try {
      const { type, release } = req.body;

      switch (type) {
        case this.recentType:
          await releasesService.addRecentRelease(release);
          break;
        case this.favouriteType:
          await releasesService.addFavoutireRelease(release);
          break;
        default:
          return next(
            ApiError.BadRequest(`Such type ${type} is not supported`)
          );
      }

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  deleteRelease = async (req, res, next) => {
    try {
      const { type, titleCode, isDeleteAll = false } = req.query;

      switch (type) {
        case this.recentType:
          await releasesService.deleteRecentRelease({ titleCode, isDeleteAll });
          break;
        case this.favouriteType:
          await releasesService.deleteFavoutireRelease({
            titleCode,
            isDeleteAll,
          });
          break;
        default:
          return next(
            ApiError.BadRequest(`Such type ${type} is not supported`)
          );
      }

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new ReleasesController();
