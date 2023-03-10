const Router = require("express").Router;
const userController = require("./../controllers/user-controller");
const releasesController = require("./../controllers/releases-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("./../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 9, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/releases", authMiddleware, releasesController.getReleases);
router.post("/releases", authMiddleware, releasesController.addRelease);
router.delete("/releases", authMiddleware, releasesController.deleteRelease);

module.exports = router;
