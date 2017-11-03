import Bird from "./bird";
import Missile from "../missile";
import AbstractFactory from "../../../factory/abstractFactory";

export default interface BirdState {
  fire(bird: Bird): Array<Missile>;
};
