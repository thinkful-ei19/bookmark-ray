'use strict'
/* global Item */

const store = (function() {
    const addBookmark = function(bookmark) {
        this.bookmarks.push(bookmark);
    };






    return {
        bookmarks: []
    }
}());