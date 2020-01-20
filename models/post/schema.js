const {Wysiwyg} = require('@keystonejs/fields-wysiwyg-tinymce');
const {
    File,
    Text,
    Slug,
    Relationship,
    Select,
    DateTime,
} = require('@keystonejs/fields');
const { fileAdapter } = require('../../utils/adapter');

exports.Post = {
    fields: {
        title: { type: Text },
        slug: { type: Slug, from: 'title' },
        author: {
            type: Relationship,
            ref: 'User',
        },
        categories: {
            type: Relationship,
            ref: 'PostCategory',
            many: true,
        },
        status: {
            type: Select,
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
        },
        body: { type: Wysiwyg },
        posted: { type: DateTime, format: 'DD/MM/YYYY' },
        image: { type: File, adapter: fileAdapter },
    },
    adminConfig: {
        defaultPageSize: 20,
        defaultColumns: 'title, status',
        defaultSort: 'title',
    },
    labelResolver: item => item.title,
};
