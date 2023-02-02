"use strict"
//loading gif before page loads
$(window).on('load', function () {
    $('#loading').hide();
})

const movieURL = "https://tulip-marsh-cake.glitch.me/movies";
//requests all data from the json database
let movies = undefined;

//this function pulls the data from the database each time it is called
function refreshMovieData() {
    fetch(movieURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
        // console.log(data);
        movies = data;
        makeMovies();
    });
}

refreshMovieData();

//this function is used to make the movies and display them on the page from the database
function makeMovies() {
    var movieHTML = '';
    for (let i = 0; i < movies.length; i++) {
        movieHTML += `<div>
                        <div>${movies[i].title}</div>
                        <div>${movies[i].rating}</div>
                    </div>
                        <button class="delete-btn" data-id="${movies[i].id}"> Delete Movie</button>`
        $('#movie-table-1').html(movieHTML);
    }
}

//function that adds movies to the page when the submit button is clicked
function addMovie() {
    //created movie object based on user input
    const movieObj = {
        title: $('#add-movie-name').focus().val(),
        rating: $('#add-movie-rating2').focus().val(),
        id: movies.length + 1
    };

    const addedOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    };
    fetch(movieURL, addedOptions)
        .then((response) => {
            // console.log(response);
            refreshMovieData(response); //we did this here so that we can refresh from the database each time
        })
        .catch(error => console.error(error));
}

$('#submit-movie').click(addMovie); //added event listener to add to HTML on submit button


//function that deletes the specified movie from the page
function deleteMovie() {
    let deletedMovieURL = `https://tulip-marsh-cake.glitch.me/movies/${movies.id}`;
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(refreshMovieData),
    };
    fetch(deletedMovieURL, deleteOptions)
        .then((response) => {
            // console.log(response);
            refreshMovieData(response); //we did this here so that we can refresh from the database each time
        })
        .catch(error => console.error(error));
}

$('#movie-table-1').on("click", "button.delete-btn", function () {
    var buttonID = $(this).attr("data-id");
});
