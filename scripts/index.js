'use strict'

/* global $, bookmark, store, api */

$(document).ready(function() {
    bookmark.bindEventListeners();
    api.getBookmarks((bookmarks) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        bookmark.render();
    });
});

