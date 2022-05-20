const mongoose = require('mongoose');


const { Schema, model } = mongoose;


const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        link: String,
        imageLink: String,
        videoLink: String,
        folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
        
    }
)

module.exports = model('Article', articleSchema);