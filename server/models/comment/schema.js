const {
    Text,
    Relationship,
    DateTime
} = require('@keystonejs/fields');

exports.Comment = {
    fields: {
        body: { type: Text, isMultiline: true },
        originalPost: {
            type: Relationship,
            ref: 'Post',
        },
        author: {
            type: Relationship,
            ref: 'User',
        },
        posted: { type: DateTime },
    },
    labelResolver: item => item.body,
};