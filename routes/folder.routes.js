const router = require('express').Router();

const Folder = require('../models/Folder.model');
const Article = require('../models/Article.model');

router.post('/folders', (req, res, next) => {
    const { title, theme } = req.body;


    Folder.create(
        {
            title,
            theme,
            articles: []
    })
    .then(response => res.json(response))
    .catch(err => {
        console.log("error creating a new folder", err);
        res.status(500).json({
            message: "error creating a new folder",
            error: err
        });
    })
})

module.exports = router;