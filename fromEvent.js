function fromEvent(dom, eventName) {
  return {
    forEach: function (observer) {
      const handler = (e) => observer.onNext(e);
      const listener = dom.addEventListener(eventName, handler);

      return {
        dispose: () => removeEventListener(listener, handler),
      };
    },
  };
}

fromEvent(document, "mousedown").forEach({
  onNext: (e) => console.log(e),
});
