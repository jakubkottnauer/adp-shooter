import Observer from "./observer";

export default abstract class Subject {
  private observers = new Array<Observer>();
  public subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  public unsubscribe() {
    // TODO: implement removal from list!
  }

  public notifyObservers() {
    this.observers.forEach(x => x.notify());
  }
}
