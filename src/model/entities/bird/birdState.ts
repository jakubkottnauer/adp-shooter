import AbstractFactory from "../../../factory/abstractFactory";
import Missile from "../missile";
import Bird from "./bird";

export default interface BirdState {
  fire(factory: AbstractFactory, x: number, y: number): Missile[];
};
