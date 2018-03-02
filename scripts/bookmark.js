'use strict'

/* global store */

const bookmarkList = (function() {
    
    const generateBookmarkElement = function(item) {
        const star = `span class="fa fa-star checked"></span>`;
        let starString = '';
        for (let i = 0; i < item.rating; i++) {
            starString += star;
        }
        return `
            <li class="simple" id="${item.id}">
                <div class="col-3">
                    <h3>${item.title}</h3>
                    <button class="show-details">Show more info</button>
                    <p class="rating${item.rating}">${starString}</p>
                </div>
            </li>
        `
    }

    function generateBookmarkString(bookmarks = store.bookmarks) {
        const items = bookmarks.map((item) => generateBookmarkElement(item));
        return items.join('');
    }

    const expandedView = function() {
        const expandedBookmark = function(item) {
            const star = `<span class="fa fa-star checked"></span>`;
            let starString = '';
            for (let i=0; i<item.rating; i++) {
                starString += star;
            }
            return `
            <div class="col-3">
                <h3>${item.title}</h3>
                <p class="rating${item.rating}">${starString}</p>
            </div>
            <div class="col-3">
                <span id="change-rating-span">Change Rating
                <select id="change-rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </span>
                <button class="visit-url"><a href="${item.url}" target="_blank">Visit Page</a></button>
                <button class="delete-item">Delete</button>
                <button class="show-details">Close Details</button>
            </div>
            <div class="col-6">
                <span class="item-description">${item.desc}</span>
                <button class="item-description-button">Edit Description</button>
            </div>
            <div class="details-button-div">
            </div>
            `
        }

        const condensedView = function(item) {
            const star = `<span class="fa fa-star checked"></span>`;
            let starString = '';
            for (let i=0; i<item.rating; i++) {
                starString += star;
            }
            return `
            <div class="col-3">
                <h3>${item.title}</h3>
                <button class="show-details">Show Details</button>
                <p class="rating${item.rating}">${starString}</p>
            </div>
            `
        }

       $('ul').on('click', '.show-details', function() {
           let bookmark = store.findBookmarkId(this.closest('li').id);
           let htmlString = condensedView(bookmark);
           if($(this).closest('li').hasClass('simple')) {
               $(this).closest('li').removeClass('simple');
               htmlString = expandedView(bookmark);
           } else {
               $(this).closest('li').addClass('simple');
           }
           $(this).closest('li').html(htmlString);
       })
    }

    const deleteBookmark = function() {
       $('ul').on('click', '.delete-item', function() {
           let bookmarkId = store.findBookmarkId(this.closest('li').id).id;
           api.deleteBookmark(bookmarkId, () => {
               store.bookmarks = store.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
               render();
           })
       })
    }

    const ratingSort = function() {
        $('#filter-by-rating').on('change', function() {
            let rating = document.getElementById('filter-by-rating');
            let selectedRating = rating.options[rating.selectedIndex].value;
            let tempArray = store.bookmarks.filter((bookmark) => (bookmark.rating >= selectedRating));
            let htmlString = buildHtml(tempArray);
            $('.results').html(htmlString);
        })
    }

    const render = function() {
        let htmlString = generateBookmarkString();
        $('.results').html(htmlString);
    }

    const displayAddForm = function() {
        $('.display-add-bookmark').on('click', function() {
            if($('.add-div').hasClass('hidden') === true) {
                $('.add-div').removeClass('hidden');
            } else {
                $('add.div').addClass('hidden');
            }
        })
    }

    const submitNewBookmark = function() {
        $('#add-bookmark-form').on('submit', function(event) {
            $('.add-div').addClass('hidden');
            event.preventDefault();
            let rating = document.getElementById('form-rating');
            let selectedRating = rating.options[rating.selectedIndex].value;

            const newBookmark = {
                id: cuid(),
                title: $('#title').val(),
                url: $('#link').val,
                rating: selectedRating,
                description: $('#description').val
            }
            $('#title').val('');
            $('#link').val('');
            $('#description').val('');
            api.createBookmark(newBookmark, (bookmark) => {
                store.addBookmark(bookmark);
                render();
            });
        })
    }

    function bindEventListeners() {
        displayAddForm();
        submitNewBookmark();
        expandedView();
        deleteBookmark();
        ratingSort();
        render();
    }

    return {
        bindEventListeners,
        displayAddForm,
        submitNewBookmark,
        expandedView,
        deleteBookmark,
        ratingSort,
        render
    }
}());