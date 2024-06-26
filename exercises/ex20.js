import { loadProtos } from "./lib";
loadProtos();

/*
 * Exercise 20: Retrieve the id, title, and smallest box art url for every video.
 *
 * This is a variation of the problem we solved earlier, where we retrieved the url of the boxart with a width of 150px.
 * This time we'll use reduce() instead of filter() to retrieve the smallest box art in the boxarts array.
 */
function ex20() {
  var movieLists = [
    {
      name: "New Releases",
      videos: [
        {
          id: 70111470,
          title: "Die Hard",
          boxarts: [
            {
              width: 150,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg",
            },
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 654356453,
          title: "Bad Boys",
          boxarts: [
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg",
            },
            {
              width: 140,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
    {
      name: "Thrillers",
      videos: [
        {
          id: 65432445,
          title: "The Chamber",
          boxarts: [
            {
              width: 130,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg",
            },
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 675465,
          title: "Fracture",
          boxarts: [
            {
              width: 200,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
            },
            {
              width: 120,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg",
            },
            {
              width: 300,
              height: 200,
              url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
            },
          ],
          url: "http://api.netflix.com/catalog/titles/movies/70111470",
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
  ];

  // Use one or more concatMap, map, and reduce calls to create an array with the following items (order matters)
  // [
  //	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
  //	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
  //	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
  //	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  function isLesser(acc, curr) {
    return curr.width * curr.height < acc.width * acc.height;
  }

  return movieLists.flatMap((list) =>
    list.videos.flatMap((video) =>
      video.boxarts
        .reduceBox((acc, curr) => (isLesser(acc, curr) ? curr : acc))
        .map((art) => ({
          id: video.id,
          title: video.title,
          boxart: art.url,
        }))
    )
  );
}

console.log(ex20());
