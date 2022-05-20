const router = require("express").Router();
const authRoutes = require("./auth.routes");
const folderRoutes = require("./folder.routes");
const articleRoutes = require("./article.routes");
const { isAuthenticated } = require('../middleware/jwt.middleware');

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.use('/auth', authRoutes);
router.use('/', isAuthenticated, folderRoutes);
router.use('/', isAuthenticated, articleRoutes);


module.exports = router;
