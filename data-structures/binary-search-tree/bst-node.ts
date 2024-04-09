export class BSTNode<T> {
  constructor(
    public value: T,
    public left?: BSTNode<T>,
    public right?: BSTNode<T>
  ) {}
}
