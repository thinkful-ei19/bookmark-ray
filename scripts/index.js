'use strict'

/* global $, bookmark, store, api */

$(document).ready(function() {
    api.getBookmarks((bookmarks) => {
        bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
        bookmark.render();
    });
    bookmark.bindEventListeners();
});

