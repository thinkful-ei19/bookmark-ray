'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };
  const deleteBookmark = function(bookmark) {
  };
  return {
    bookmarks: [],
    adding: false,
    condensed: false,
    rating: null,
    addBookmark,
    deleteBookmark
  };
}());