const releasesService = require("../services/releases-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class ReleasesController {
  async getReleases(req, res, next) {
    try {
      const releases = await releasesService.getAllReleases();
      return res.json(releases);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReleasesController();
