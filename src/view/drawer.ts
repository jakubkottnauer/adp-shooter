import DrawerVisitor from './visitor'
import Entity from '../model/entities/entity'

export default class Drawer {
  render(ctx: CanvasRenderingContext2D, entity: Entity) {
    const visitor = new DrawerVisitor();
    entity.accept(visitor)

    const [ x, y ] = visitor.position
    const [ width, height ] = visitor.dimensions
    ctx.drawImage(visitor.sprite, x, y, width, height);
  }
}
