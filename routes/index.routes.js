const router = require("express").Router();
const authRoutes = require("./auth.routes");
const folderRoutes = require("./folder.routes");
const articleRoutes = require("./article.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.use('/auth', authRoutes);
router.use('/', folderRoutes);
router.use('/', articleRoutes);


module.exports = router;
