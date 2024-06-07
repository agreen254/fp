function fromTimeout(time) {
  return {
    forEach: function (observer) {
      const timeout = setTimeout(() => {
        observer.onNext(undefined);
        observer.onComplete();
      }, time);

      return {
        dispose: () => clearTimeout(timeout),
      };
    },
  };
}

fromTimeout(5000).forEach({
  onNext: () => alert("timeout!"),
  onComplete: () => console.log("complete!")
});
