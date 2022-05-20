const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const folderSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        theme: {
            type: String,
            enum: ['People', 'Politic', 'Health', 'Sport', 'Cooking'],
            required: true
        },
        articles: [
            { type: Schema.Types.ObjectId, ref: 'Article' }
        ],
        user: { type: Schema.Types.ObjectId, ref: 'User' }


    }
)

module.exports = model('Folder', folderSchema);