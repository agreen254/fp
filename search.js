import { Observable } from "rxjs";
import $ from "jquery";

const validEndpoints = [
  "posts",
  "photos",
  "users",
  "comments",
  "albums",
  "todos",
];

const textbox = document.querySelector("#textbox");
const searchOpenButton = document.getElementById("searchOpenButton");
const searchCloseButton = document.getElementById("searchCloseButton");
const searchForm = document.getElementById("searchForm");

const keypresses = Observable.fromEvent(textbox, "keyup");
const searchOpenButtonClicks = Observable.fromEvent(searchOpenButton, "click");

const searchFormOpened = searchOpenButtonClicks.do(() => {
  searchForm.style.display = "block";
  // searchOpenButton.style.display = "none";
});

function getText(data) {
  switch (textbox.value) {
    case "users":
      return document.createTextNode(data.name);
    case "posts":
      return document.createTextNode(data.title);
    case "comments":
      return document.createTextNode(data.name);
    case "albums":
      return document.createTextNode(data.title);
    case "photos":
      return document.createTextNode(data.url);
    case "todos":
      return document.createTextNode(data.completed);
    default:
      return undefined;
  }
}

function fetchUsers(query) {
  return Observable.create((observer) => {
    let cancelled = false;
    const url = `https://jsonplaceholder.typicode.com/${query}`;
    $.getJSON(url, (data) => {
      if (!cancelled) {
        observer.next(data);
        observer.complete();
      }
    });

    return () => (cancelled = true);
  });
}

/**
 * The created observable without flattening is 2D.
 * This is because we ensure the async request will only be sent once the `trigger`
 * event has occurred. This requires us to map over the triggering event,
 * thereby creating a 2D observable.
 *
 * We must flatten it back to one dimension in order to stringify the response properly.
 *
 * WHENEVER WE MAP OVER AN OBSERVABLE AND CREATE ANOTHER OBSERVABLE,
 * THAT CREATES A NEW DIMENSION.
 */
const stream = searchFormOpened.switchMap(() => {
  const searchCloseButtonClicks = Observable.fromEvent(
    searchCloseButton,
    "click"
  );
  const searchFormClosed = searchCloseButtonClicks.do(() => {
    searchForm.style.display = "none";
    // searchOpenButton.style.display = "block";
  });

  return (
    keypresses
      .filter(() => validEndpoints.includes(textbox.value))
      // avoid race conditions with switchMap
      .switchMap(() => fetchUsers(textbox.value))
      .takeUntil(searchFormClosed)
  );
});

export const subStream = () =>
  stream
    .forEach((ev) => console.log(JSON.stringify(ev)))
    .catch(() => console.log("oh no!"));
