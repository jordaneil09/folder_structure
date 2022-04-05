export class NodeModel {
  public id: string;
  public type: 'folder' | 'file' | 'unset' | null;
  public children: NodeModel[] = [];
  public name: string = '';

  public static idIncrementer: number = 0;

  constructor(newNode: any) {
    this.id = newNode.id;
    this.type = newNode.type;
    this.children = newNode.children?.map(
      (childNode: any) => new NodeModel(childNode)
    );
    this.name = newNode.name || '';

    NodeModel.idIncrementer++;
  }

  public static generateNewId(): string {
    return (NodeModel.idIncrementer + 1).toString();
  }

  export(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      children: this.children?.map((child: NodeModel) => child.export()) || [],
    };
  }
}
