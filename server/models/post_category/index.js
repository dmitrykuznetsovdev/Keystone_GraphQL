const { keystone }  = require('../../../index');
const {Text, Checkbox, Password} = require('@keystonejs/fields');


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