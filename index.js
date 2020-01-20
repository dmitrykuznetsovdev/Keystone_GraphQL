const {Keystone} = require('@keystonejs/keystone');
const {PasswordAuthStrategy} = require('@keystonejs/auth-password');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const {MongooseAdapter} = require('@keystonejs/adapter-mongoose');

const { StaticApp } = require('@keystonejs/app-static');

const { staticRoute, staticPath} = require('./config');
const { User, Post, PostCategory, Comment } = require('./models/schema');

const PROJECT_NAME = "keystone-next";


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter(),
    onConnect: async () => {
        const users = await keystone.lists.User.adapter.findAll();
        if (!users.length) {
            const initialData = require('./initialData');
            await keystone.createItems(initialData);
        }
    },
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User'
});

keystone.createList('User', User);
keystone.createList('Post', Post);
keystone.createList('PostCategory', PostCategory);
keystone.createList('Comment', Comment);


const adminApp = new AdminUIApp({
    adminPath: '/admin',
    hooks: require.resolve('./admin/'),
    authStrategy,
    isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
});

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new StaticApp({ path: staticRoute, src: staticPath }),
        adminApp,
        // new NextApp({ dir: 'app' }),
    ]
};
