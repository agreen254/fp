import { deepLog, loadProtos } from "./lib/lib.mjs";
loadProtos();

/*
 * Exercise 26: Converting from Arrays to Deeper Trees
 *
 * Let's try creating a deeper tree structure. 
 * This time we have 4 separate arrays each containing lists, videos, boxarts, and bookmarks respectively. 
 * Each object has a parent id, indicating its parent. We want to build an array of list objects, each with a name and a videos array. 
 * The videos array will contain the video's id, title, bookmark time, and smallest boxart url. In other words we want to build the following structure:

    [
        {
            "name": "New Releases",
            "videos": [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "time": 32432,
                    "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "time": 3534543,
                    "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
                }
            ]
        },
        {
            "name": "Thrillers",
            "videos": [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "time": 645243,
                    "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "time": 984934,
                    "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
                }
            ]
        }
    ]

 */

function ex26() {
  var lists = [
      {
        id: 5434364,
        name: "New Releases",
      },
      {
        id: 65456475,
        name: "Thrillers",
      },
    ],
    videos = [
      {
        listId: 5434364,
        id: 65432445,
        title: "The Chamber",
      },
      {
        listId: 5434364,
        id: 675465,
        title: "Fracture",
      },
      {
        listId: 65456475,
        id: 70111470,
        title: "Die Hard",
      },
      {
        listId: 65456475,
        id: 654356453,
        title: "Bad Boys",
      },
    ],
    boxarts = [
      {
        videoId: 65432445,
        width: 130,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg",
      },
      {
        videoId: 65432445,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg",
      },
      {
        videoId: 675465,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg",
      },
      {
        videoId: 675465,
        width: 120,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg",
      },
      {
        videoId: 675465,
        width: 300,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg",
      },
      {
        videoId: 70111470,
        width: 150,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg",
      },
      {
        videoId: 70111470,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg",
      },
      {
        videoId: 654356453,
        width: 200,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg",
      },
      {
        videoId: 654356453,
        width: 140,
        height: 200,
        url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg",
      },
    ],
    bookmarks = [
      { videoId: 65432445, time: 32432 },
      { videoId: 675465, time: 3534543 },
      { videoId: 70111470, time: 645243 },
      { videoId: 654356453, time: 984934 },
    ];

  return lists.map((list) => ({
    name: list.name,
    videos: videos
      .filter((v) => v.listId === list.id)
      .flatMap((v) => {
        const bookmarkTime = bookmarks.filter((mark) => mark.videoId === v.id);
        const boxart = boxarts
          .filter((art) => art.videoId === v.id)
          .reduceBox((acc, curr) =>
            curr.width * curr.height < acc.width * acc.height ? curr : acc
          );
        return Array.zip(bookmarkTime, boxart, (mark, art) => ({
          id: v.id,
          title: v.title,
          time: mark.time,
          boxart: art.url,
        }));
      }),
  }));
}

deepLog(ex26());
