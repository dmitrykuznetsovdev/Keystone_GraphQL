const {Keystone} = require('@keystonejs/keystone');
const {PasswordAuthStrategy} = require('@keystonejs/auth-password');
const {Text, Checkbox, Password} = require('@keystonejs/fields');
const {GraphQLApp} = require('@keystonejs/app-graphql');
const {AdminUIApp} = require('@keystonejs/app-admin-ui');
const {MongooseAdapter} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "keystone-next";


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new MongooseAdapter(),
});


keystone.createList('User', {
    fields: {
        name: {type: Text},
        email: {
            type: Text,
            isUnique: true,
        },
        isAdmin: {type: Checkbox},
        password: {
            type: Password,
        },
    },
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
    config: {
        identityField: 'username', // default: 'email'
        secretField: 'password', // default: 'password'
    },
});


module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({
            enableDefaultRoute: true,
            authStrategy
        })
    ],
};
