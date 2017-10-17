import Observer from "./observer";

export default abstract class Subject {
  observers = new Array<Observer>();
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe() {
    // TODO: implement removal from list!
  }

  notifyObservers() {
    this.observers.forEach(x => x.notify());
  }
}
