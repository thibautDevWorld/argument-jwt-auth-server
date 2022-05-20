const router = require("express").Router();

const { default: mongoose} = require('mongoose');
const Article = require('../models/Article.model');
const Folder = require('../models/Folder.model');




///Create an userArticle
router.post('/article', (req, res, next) => {
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


/// Diplay list of userArticles
router.get('/articlesList/:folderId', (req, res, next) => {
    const { folderId } = req.params;

    Article.find()
        .then(allArticles => {
            const folderArticles = allArticles.filter((article) => {
                return article.folder == folderId
            })
            res.status(200).json(folderArticles)
           
        })
        .catch(err => {
            console.log("error displaying all folders", err);
            res.status(500).json({
                message: "error displaying all folders",
                error: err
            });
        })
})


///Display one article
router.get('/articles/:articleId', (req, res, next) => {
    const { articleId } = req.params;

     
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Article.findById(articleId)
        .then(article => {
            console.log(article)
            res.status(200).json(article)
        })
        .catch(err => {
            console.log("error displaying this specific article", err);
            res.status(500).json({
                message: "error displaying this specific article",
                error: err
            });
        })
})


///Delete articles
router.delete('/articles/:articleId', (req, res, next) => {
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400).json({ message: "Specified id is not valid" })
    }

    Article.findByIdAndRemove(articleId)
        .then(article => {
        return Folder.findByIdAndUpdate(article.folder, { $pull: { articles: article._id } })
        })
        .then(() => res.json({ message: `Article with ${articleId} was removed successfully.` }))
        .catch(err => {
            console.log("error deleting the article", err);
            res.status(500).json({
                message: "error deleting the article",
                error: err
            });
        })
    
})














module.exports = router;