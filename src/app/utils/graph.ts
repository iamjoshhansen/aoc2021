export class Node<T> {
  readonly outs = new Set<Node<T>>();
  readonly ins = new Set<Node<T>>();

  get connections() {
    return [...this.outs];
  }

  constructor(public value: T) {}

  connectTo(node: Node<T>) {
    this.outs.add(node);
    node.ins.add(node);
  }

  disconnect(node?: Node<T>) {
    if (node) {
      this.outs.delete(node);
      node.ins.delete(this);
      return;
    }

    // disconnect from all
    this.ins.forEach((n) => n.disconnect(this));
    this.outs.clear();
  }
}

export class Graph<T> {
  private readonly nodes = new Map<string, Node<T>>();

  get values() {
    return [...this.nodes.values()].map((node) => node.value);
  }

  constructor(
    private identifier: (value: T) => string = (item: T) => `${item}`
  ) {}

  addNode(value: T) {
    const id = this.identifier(value);
    const existing = this.nodes.get(id);
    if (existing) {
      return;
    }

    const newNode = new Node(value);
    this.nodes.set(id, newNode);
  }

  removeNode(value: T) {
    const id = this.identifier(value);
    const node = this.nodes.get(id);
    if (node) {
      node.disconnect();
    }
    this.nodes.delete(id);
  }

  getConnections(value: T): null | T[] {
    const id = this.identifier(value);
    const node = this.nodes.get(id);
    if (!node) {
      return null;
    }

    return node.connections.map((node) => node.value);
  }

  connectNode(source: T, target: T) {
    const sourceId = this.identifier(source);
    const targetId = this.identifier(target);

    const sourceNode = this.nodes.get(sourceId);
    if (!sourceNode) {
      throw new Error(
        `Cannot connect ${sourceId} and ${targetId}: ${sourceId} does not exist`
      );
    }

    const targetNode = this.nodes.get(targetId);
    if (!targetNode) {
      throw new Error(
        `Cannot connect ${sourceId} and ${targetId}: ${targetId} does not exist`
      );
    }

    sourceNode.connectTo(targetNode);
  }
}
