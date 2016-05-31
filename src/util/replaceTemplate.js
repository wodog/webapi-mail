'use strict';

/**
 * replaceTemplate, 替换格式为 ${xxx}
 * 
 * @param  {String} 模版
 * @param  {Object} 替换内容
 * @return {String} 返回替换后的内容
 */
module.exports = function(template, data) {
    data = JSON.parse(data);
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const regexp = new RegExp('\\$\\{' + keys[i] + '\\}', 'ig');
        template = template.replace(regexp, data[keys[i]]); 
    }
    return template;
};
