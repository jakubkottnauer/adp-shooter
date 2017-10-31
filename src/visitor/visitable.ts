import Visitor from './visitor'

export default interface Visitable {
  accept(visitor: Visitor): void;
}
