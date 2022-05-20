const router = require('express').Router();

const { default: mongoose } = require('mongoose');
const Folder = require('../models/Folder.model');
const User = require('../models/User.model');
// const Article = require('../models/Article.model');

router.post('/', (req, res, next) => {
    const { title, theme, userId } = req.body;


    Folder.create(
        {
            title,
            theme,
            articles: [],
            user: userId
        })
        .then(folder => {

            return User.findByIdAndUpdate(userId, { $push: { folders: folder._id } })
        })
        .then(response => {
            console.log(response);
            res.status(200).json('the folder have been made')
        }
        )
        .catch(err => {
            console.log("error creating a new folder", err);
            res.status(500).json({
                message: "error creating a new folder",
                error: err
            });
        })
})




router.get('/', (req, res, next) => {
    Folder.find()
        .populate('articles')
        .then(allFolders => {
            res.status(200).json(allFolders)
        })
        .catch(err => {
            console.log("error displaying all folders", err);
            res.status(500).json({
                message: "error displaying all folders",
                error: err
            });
        })
})


router.get('/:folderId', (req, res, next) => {
    const { folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Folder.findById(folderId)
        .populate('articles')
        .then(folder => {
            res.status(200).json(folder)
        })
        .catch(err => {
            console.log("error displaying this specific folder", err);
            res.status(500).json({
                message: "error displaying this specific folder",
                error: err
            });
        })
})


router.put('/:folderId', (req, res, next) => {
    const { folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        res.status(400).json({ message: "Specified id is not valid" })
    }


    Folder.findByIdAndUpdate(folderId, req.body, { new: true })
        .then((updateFolder) => res.json(updateFolder))
        .catch(err => {
            console.log("error updating the folder", err);
            res.status(500).json({
                message: "error updating the folder",
                error: err
            });
        })
})


router.delete('/:folderId', (req, res, next) => {
    const { folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        res.status(400).json({ message: "Specified id is not valid" })
    }

    Folder.findByIdAndRemove(folderId)
        .then(() => res.json({ message: `Folder with ${folderId} was removed successfully.` }))
        .catch(err => {
            console.log("error deleting the folder", err);
            res.status(500).json({
                message: "error deleting the foler",
                error: err
            });
        })
})









module.exports = router;
