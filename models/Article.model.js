const mongoose = require('mongoose');


const { Schema, model } = mongoose;


const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        Description: String,
        link: String,
        ImageLink: String,
        VideoLink: String,
        folder: { type: Schema.Types.ObjectId, ref: 'Folder' }
    }
)

module.exports = model('Article', articleSchema);