'use strict';

/* global store, api */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {

//returns html element as a string
  function generateBookmarkElement(bookmark) {
    return `
    <li class="js-item-index-element" data-bookmark-id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <span class="bookmark-descr js-bookmark-descr hidden">${bookmark.desc || ''}</span>
        <a href="${bookmark.url}" target="_blank" class="bookmark-item js-bookmark-link hidden">Click to Visit</a>
    <div class="bookmark-item-controls">
      <button class="bookmark-item-toggle js-item-toggle" data-bookmark-id="${bookmark.id}">
          <span class="button-label">Details</span>
      </button>
      <button class="bookmark-item-delete js-item-delete" data-bookmark-id="${bookmark.id}">
          <span class="button-label">Delete</span>
      </button>
    </div>
   </li>`;
  }

  function generateBookmarkString(bookmarkList) {
    //will map over bookmarkList array and generateBookmarkElement on each
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function renderBookmarkList() {
    api.getBookmarks((bookmarks) => {
      store.bookmarks = bookmarks;
      const bookmarkHtmlElement = generateBookmarkString(store.bookmarks);
      //console.log(bookmarkHtmlElement);
      $('.js-bookmark-list').html(bookmarkHtmlElement);
    });
  }

  function handleAddButtonClicked() {
    //event listener - listener for add button to be clicked
    //target hidden class
    $('.js-add-checked').change(function() {
      if($('input[type=checkbox]').prop('checked')) {
        $('.js-add-toggle').removeClass('hidden');
      } else {
        $('.js-add-toggle').addClass('hidden');
      }
    });
  }

  // //function is for when user clicks add new bookmark
  function handleNewBookmarkSubmit() {
    $('#new-bookmark-submit').click(function(event) {
      event.preventDefault();
      const newBookmark = {
        title: $('.js-bookmark-list-entry').val(),
        desc: $('#description-box').val(),
        rating: $('#new-rating-drop-down').val(),
        url: $('#url-box').val()
      };
      $('.js-bookmark-list-entry').val('');
      $('#description-box').val('');
      $('#new-rating-drop-down').val('');
      $('#url-box').val('');
      if(newBookmark.title === '') {
        alert('Please enter a title');
        return false;
      } if(newBookmark.url === '') {
        alert('Please enter a url');
        return false;
      }
      api.createBookmark(newBookmark, renderNewBookmark);
    });
  }

  function renderNewBookmark(data) {
    const bookmarkElement = generateBookmarkElement(data);
    //.prepend adds to top of list
    $('.js-bookmark-list').prepend(bookmarkElement);
  }

  function handleToggleDetails() {
    $('.js-bookmark-list').on('click', '.js-item-toggle', event => {
      const bookmarkId = $(event.currentTarget).attr('data-bookmark-id');
      $(`[data-bookmark-id=${bookmarkId}]`).find('.js-bookmark-descr').toggleClass('hidden');
      $(`[data-bookmark-id=${bookmarkId}]`).find('.js-bookmark-link').toggleClass('hidden');
    //   console.log('toggle clicked');
    //   $('.js-bookmark-descr').toggleClass('hidden');
    //   $('.js-bookmark-link').toggleClass('hidden');
    });
  }

  

  function handleRatingDropDownClicked() {
  //event listener - listen for click on rating drop down
    $('.rating-filter').on('change', event => { //fat arrow doesn't create new scope
      const rating = $(event.target).find('option:selected').val();
      console.log(rating);
    $('.rating-drop-down').each(function(item) {
      if ($(this).find('.rating').text() >= rating) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      } 
    });
    });
  }


  function handleBookmarkDeleteClicked() {
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      const bookmarkId = $(event.currentTarget).attr('data-bookmark-id');
      api.deleteBookmark(bookmarkId, renderBookmarkList);
    });
  }

  function bindEventListeners() {
    handleAddButtonClicked();
    handleNewBookmarkSubmit();
    handleRatingDropDownClicked();
    handleBookmarkDeleteClicked();
    handleToggleDetails();
  }
    
  return {
    renderBookmarkList,
    bindEventListeners
  };
}());

