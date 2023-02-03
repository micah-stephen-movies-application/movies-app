"use strict"
//loading gif before page loads
$(window).on('load', function () {
    $('#loading').hide();
})

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

//this function is used to make the movies and display them on the page from the database
function makeMovies() {
    var movieHTML = '';
    for (let i = 0; i < movies.length; i++) {
        movieHTML += `<div class="card movie-cards my-2 mx-2 delete">
                        <img src="" alt="" class="card-img-top">
                        <div class="card-body d-flex flex-wrap flex-column justify-content-center">
                            <div class="row">
                                <h3 class="card-title text-white text-center">${movies[i].title}</h3>
                                <div class="card-text text-white text-center fs-4">${movies[i].rating} ★</div>
                            </div>
                            <div class="mt-auto row">
                                <button class="edit-btn my-1" data-id="${movies[i].id}">Edit</button>
                                <button class="delete-btn my-1" data-id="${movies[i].id}">Delete</button>
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
        // id: movies.length + 1 // we don't need this because
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
            // console.log(response);
            refreshMovieData(); //we did this here so that we can refresh from the database each time
        })
        .catch(error => console.error(error));
}

$('#submit-movie').click(() => {
    addMovie();
    refreshMovieData();
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
            // console.log(response);
            // console.log((response)); //we did this here so that we can refresh from the database each time
        })
        .catch(error => console.error(error));
}

$('#movie-table-1').on("click", "button.delete-btn", function () {
    var buttonID = $(this).attr("data-id");
    deleteMovie(buttonID);
});

//function that allows us to edit the movie properties of the database and display on the page
// function editMovie(buttonID) {
//     let editedMovieURL = `https://giddy-sapphire-english.glitch.me/movies/${buttonID}`;
//     const editOptions = {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     fetch(editedMovieURL, editOptions)
//         .then((response) => {
//             // console.log(response);
//             refreshMovieData(response);
//             // console.log((response)); //we did this here so that we can refresh from the database each time
//         })
//         .catch(error => console.error(error));
// }
//
//
// $('#movie-table-1').on("click", "button.edit-btn", function () {
//     var buttonID = $(this).attr("data-id");
//     editMovie(buttonID);
//     console.log(buttonID)
// });
