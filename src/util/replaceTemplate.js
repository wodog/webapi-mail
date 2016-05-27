'use strict';

module.exports = function(template, data) {
    data = JSON.parse(data);
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const regexp = new RegExp('\\$\\{' + keys[i] + '\\}', 'ig');
        template = template.replace(regexp, data[keys[i]]);
    }
    return template;
};
