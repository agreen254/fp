const button = document.getElementById("button");

export function Observable(forEach) {
  this._forEach = forEach;
}

Observable.prototype = {
  forEach: function (onNext, onError, onCompleted) {
    /**
     * There are two possibilities:
     *
     * 1) The user supplies the functions as a spread of args
     * 2) The user supplies the functions in a singular object
     */
    if (typeof onNext === "function") {
      return this._forEach({
        onNext: onNext,
        onError: onError || function () {},
        onCompleted: onCompleted || function () {},
      });
    } else {
      return this._forEach(onNext);
    }
  },
  map: function (projectionFunction) {
    const self = this;
    /**
     * Need to capture the this object because the new observable
     * has to use the forEach of the parent
     */
    return new Observable(function forEach(observer) {
      return self.forEach(
        function onNext(x) {
          observer.onNext(projectionFunction(x));
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      );
    });
  },
  filter: function (predicateFunction) {
    const self = this;
    return new Observable(function forEach(observer) {
      return self.forEach(
        function onNext(x) {
          if (predicateFunction(x)) observer.onNext(x);
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      );
    });
  },
  take: function (n) {
    const self = this;
    return new Observable(function forEach(observer) {
      let counter = 0;
      const subscription = self.forEach(
        function onNext(x) {
          observer.onNext(x);
          counter++;
          if (counter === n) {
            observer.onCompleted();
            subscription.dispose();
          }
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      );
      return subscription;
    });
  },
};

Observable.fromEvent = function (domElement, eventName) {
  const forEach = (observer) => {
    const handler = (e) => observer.onNext(e);

    domElement.addEventListener(eventName, handler);

    return {
      dispose: () => domElement.removeEventListener(eventName, handler),
    };
  };

  return new Observable(forEach);
};

const clicks = Observable.fromEvent(button, "click");
export const subscribeClicks = () =>
  clicks.forEach((x) => console.log(x.pageX));
export const subscribeClicksMapped = () =>
  clicks
    .map((click) => {
      const value = click.pageX;
      if (value % 15 === 0) return "FizzBuzz";
      else if (value % 5 === 0) return "Fizz";
      else if (value % 3 === 0) return "Buzz";
      else return value;
    })
    .filter((x) => Number(x) === Number(x))
    .forEach((x) => console.log(x));
