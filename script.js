$(document).ready(function(){

  $("#submit").click(function(){
    let movieTitle = $("#movieInput").val();
    let movieAPI = "https://api.themoviedb.org/3/search/movie?api_key=1de8557f26f4d177fcb5b21811677161&language=en-US&query="+movieTitle+"&page=1&include_adult=false";
    let moviePosterURL = "https://image.tmdb.org/t/p/w500";
    $(".review").text("");
    $("#reviewLink").attr("href","");
    $("#reviewLink").text("");

    fetch(movieAPI)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let moviePoster = data.results[0].poster_path;
        moviePosterURL = moviePosterURL+moviePoster;
        let movieTitle = data.results[0].original_title;
        let releaseDate = data.results[0].release_date;
        let overview = data.results[0].overview;
        let movieID = data.results[0].id;
        let reviewAPI = "https://api.themoviedb.org/3/movie/"+movieID+"/reviews?api_key=1de8557f26f4d177fcb5b21811677161&language=en-US&page=1"

        $("#moviePoster").attr("src",moviePosterURL);
        $("#movieTitle").text(movieTitle);
        $("#releaseDate").text("Release Date: "+releaseDate);   
        $("#overviewHeader").text("Overview")
        $("#overview").text(overview);
              
        fetch(reviewAPI)
          .then(function(response) {
              return response.json();
            })
          .then(function(data) {
              // TODO make a loop to diplay multiple reviews (at most two; to fit aesthetic of website)
              let rawReview = data.results[0].content;
              let reviewAuthor = data.results[0].author;
              let reviewLink = data.results[0].url;
              let reviewPreview = rawReview.slice(0,400);
              reviewPreview = reviewPreview + ". . ."
          
              $("#reviewHeader").text("Reviews:");
              $(".review").text(reviewPreview);
              $("#reviewLink").text("(View Full Review by "+reviewAuthor+")");
              $("#reviewLink").attr("href",reviewLink);
          });
      });
  });
}); 