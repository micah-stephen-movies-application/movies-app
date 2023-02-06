"use strict"
//loading gif before page loads
$(window).on('load', function () {
    $('#loading').hide();
});

//movie url used from glitch to get the database
const movieURL = "https://giddy-sapphire-english.glitch.me/movies";
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

//this function is used to make the movies from the existing database and display them on the page
function makeMovies() {
    var movieHTML = '';
    for (let i = 0; i < movies.length; i++) {
        movieHTML += `<div class="card movie-cards my-2 mx-2 delete">
                        <img src="" alt="" class="card-img-top">
                        <div class="card-body d-flex flex-wrap flex-column justify-content-center">
                            <div class="row">
                                <h3 class="card-title text-black text-center">${movies[i].title}</h3>
                                <div class="card-text text-black text-center fs-4">Rating: ${movies[i].rating}/10</div>
                                <i class="fa-solid fa-ticket ticket text-center"></i>
                            </div>
                            <div class="mt-auto d-flex">
                                <button class="edit-btn" data-id="${movies[i].id}" data-bs-toggle="modal" data-bs-target="#editMovieModal"><i class="edit-icon fa-solid fa-pen-to-square"></i></button>
                                <button class="delete-btn" data-id="${movies[i].id}"><i class="delete-icon fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>`
    }
    $('#movie-table-1').html(movieHTML);
}

//function that adds movies to the page when the submit button is clicked
function addMovie() {
    //created movie object based on user input
    const movieObj = {
        title: $("#add-movie-name").focus().val(),
        rating: $("#add-movie-rating2").focus().val()
        // id: movies.length + 1 // we don't need this because Glitch sets the ID for me
    };
    const addedOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    };
    fetch(movieURL, addedOptions)
        .then(() => {
            refreshMovieData(); //we did this here so that we can refresh from the database each time
        })
        .catch(error => console.error(error));
}

$('#submit-movie').click(() => {
    addMovie();
}); //added event listener to add to HTML on submit button


//function that deletes the specified movie from the page
function deleteMovie(buttonID) {
    let deletedMovieURL = `https://giddy-sapphire-english.glitch.me/movies/${buttonID}`;
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(deletedMovieURL, deleteOptions)
        .then(() => {
            refreshMovieData();
        })
        .catch(error => console.error(error));
}

$('#movie-table-1').on("click", "button.delete-btn", function () {
    var buttonID = $(this).attr("data-id");
    deleteMovie(buttonID);
    console.log(buttonID);
});


//on click - this grabs the data from the card and inputs it into the modal
$('#movie-table-1').on("click", "button.edit-btn", function () {
    var buttonID = $(this).attr("data-id");
    let editedMovieURL = `https://giddy-sapphire-english.glitch.me/movies/${buttonID}`;
    console.log(buttonID);
    fetch(editedMovieURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('#edit-movie-name').val(data.title);
            $('#edit-movie-rating2').val(data.rating);
            //this sets the edited submit button's data id to whatever the button ID is so that we can use it again now that it has the same data-id attribute as the card we want to edit
            $('#submit-edit-movie').attr("data-id", buttonID);
    })
});


// function that allows us to edit the movie properties of the database and display on the page
function editMovie(buttonID2) {
    let editedMovieURL = `https://giddy-sapphire-english.glitch.me/movies/${buttonID2}`;
    const editedMovie = {
        title:  $('#edit-movie-name').val(),
        rating: $('#edit-movie-rating2').val()
    }
    const editOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMovie),
    };
    fetch(editedMovieURL, editOptions)
        .then(() => {
            refreshMovieData();
        })
        .catch(error => console.error(error));
}

$('#submit-edit-movie').click(function () {
    var buttonID2 = $(this).attr("data-id");
    editMovie(buttonID2);
});


function getMovieAPIData () {
    fetch()
        .then(function (response) {
            return response.json();
        }) .then(function (data) {
        console.log(data);
    })
}
getMovieAPIData();

