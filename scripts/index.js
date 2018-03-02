'use strict'

/* global $, bookmark, store, api */

$(document).ready(function() {
    bookmark.bindEventListeners();
    api.getItems((items) => {
        items.forEach((item) => store.addItem(item));
        bookmark.render();
    });
});

