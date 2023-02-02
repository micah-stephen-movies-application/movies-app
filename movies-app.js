// //loading gif before page loads
$(window).on('load', function () {
    $('#loading').hide();
})

//requests all data from the json database
fetch("https://tulip-marsh-cake.glitch.me/movies")
    .then(function (response) {
        return response.json();
    }).then(function (data) {
    console.log(data);
    // this adds the current data to the page
    var movieHTML = '';
    for (let i = 0; i < data.length; i++) {
        movieHTML = `
                        <div>
                        <div>${data[i].title}</div>
                        <div>${data[i].rating}</div>
                        </div>`
        $('#movie-table-1').append(movieHTML);
    }
    //add movies
    const userMovie = {
        title: $("add-movie-name").focus().val(),
        rating: $(),
        id: data.length + 1
    };
    console.log(userMovie);

});


