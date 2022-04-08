const moment = require('moment');

module.exports = {
    formateDate: function(date,format){
        return moment(date).format(format);
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
        },
        stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
        },
        animationTest: function(){
            console.log(`this is an test function`);
        },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        // console.log(`Story User is  ${storyUser} logger User: ${loggedUser} storyId: ${storyId} and ${floating}`);

        // console.log(`story User: ` +storyUser._id.toString());
        // console.log(`logged Id:`+ loggedUser._id.toString());

        if (loggedUser._id.toString()) {
            if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
        },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
            )
            .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
            )
        },
}