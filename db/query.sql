SELECT * from movies;

SELECT * from reviews;

SELECT movies.movie_name, reviews.review
FROM movies
JOIN reviews on reviews.movie_id = movies.id;