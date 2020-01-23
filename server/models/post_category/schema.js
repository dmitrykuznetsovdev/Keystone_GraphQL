const {
    Text,
    Slug
} = require('@keystonejs/fields');

exports.PostCategory = {
    fields: {
        name: { type: Text },
        slug: { type: Slug, from: 'name' },
    },
};
