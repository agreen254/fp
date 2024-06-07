import { Observable } from "rxjs";
import $ from "jquery";

const textbox = document.querySelector("#textbox");
const textarea = document.getElementById("results");

const keypresses = Observable.fromEvent(textbox, "keyup");

const validEndpoints = [
  "posts",
  "photos",
  "users",
  "comments",
  "albums",
  "todos",
];

export const subscribeKeypresses = () =>
  keypresses.forEach(() => {
    if (validEndpoints.includes(textbox.value)) {
      fetchUsers(textbox.value).forEach((res) => alert(res));
    }
  });

function fetchUsers(query) {
  return Observable.create((observer) => {
    let cancelled = false;
    const url = `https://jsonplaceholder.typicode.com/${query}`;
    $.getJSON(url, (data) => {
      if (!cancelled) {
        observer.next(data[1]);
        observer.complete();
      }
    });

    return () => (cancelled = true);
  });
}

// getPosts().forEach((res) => alert(res));
