const {getYear} = require('date-fns');
const {
    Text,
    Checkbox,
    Password,
    CalendarDay,
    File,
    OEmbed
} = require('@keystonejs/fields');

const {avatarFileAdapter, iframelyAdapter} = require('../../utils/adapter');

exports.User = {
    fields: {
        name: {type: Text},
        email: {type: Text, isUnique: true},
        dob: {
            type: CalendarDay,
            format: 'Do MMMM YYYY',
            yearRangeFrom: 1901,
            yearRangeTo: getYear(new Date()),
        },
        ...(process.env.IFRAMELY_API_KEY
            ? {
                portfolio: {type: OEmbed, adapter: iframelyAdapter},
            }
            : {}),
        password: {type: Password},
        isAdmin: {type: Checkbox},
        avatar: {type: File, adapter: avatarFileAdapter},
    },
    labelResolver: item => `${item.name} <${item.email}>`,
};