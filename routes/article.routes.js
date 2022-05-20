const router = require("express").Router();

const Article = require('../models/Article.model');
const Folder = require('../models/Folder.model');

router.post('/', (req, res, next) => {
    const { title,
            description,
            link,
            imageLink,
            videoLink,
            folderId  
        } = req.body;

        const newArticle =   {
            title,
            description,
            link,
            imageLink,
            videoLink,
            folder: folderId
        }

    Article.create(newArticle)
    .then(article => {
        
       return Folder.findByIdAndUpdate(folderId, { $push: { articles: article._id } })
    })
    .then(response => {
        console.log(response);
        res.status(200).json('the article have been made')}
    )
    .catch(err => {
        console.log("error creating a new article", err);
        res.status(500).json({
            message: "error creating a new article",
            error: err
        });
    })
})

module.exports = router;