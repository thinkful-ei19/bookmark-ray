'use strict'
/* global Item */

const store = (function() {
    const addBookmark = function(bookmark) {
        this.bookmarks.push(bookmark);
    };
    const findBookmarkId = function(id) {
        return this.bookmarks.find(bookmark => bookmark.id === id);
    };

    return {
        bookmarks: [],
        addBookmark,
        findBookmarkId
    }
}());