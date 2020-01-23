const { User } = require('./user/schema');
const { Post } = require('./post/schema');
const { PostCategory } = require('./post_category/schema');
const { Comment } = require('./comment/schema');

module.exports = {
    User, Post, PostCategory, Comment
}