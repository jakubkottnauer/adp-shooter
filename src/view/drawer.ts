import Entity from '../model/entities/entity'
import DrawerVisitor from './visitor'

export default class Drawer {
  public render(ctx: CanvasRenderingContext2D, entity: Entity) {
    const visitor = new DrawerVisitor();
    entity.accept(visitor)

    const [ x, y ] = visitor.position
    const [ width, height ] = visitor.dimensions
    ctx.drawImage(visitor.sprite, x, y, width, height);
  }
}
