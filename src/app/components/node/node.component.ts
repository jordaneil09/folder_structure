import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NodeModel } from 'src/models/node.model';

type NodeComponentState = 'add' | 'create' | 'default';

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  /**
   * Attach role to the component host
   */
  @HostBinding("attr.role") role!: string;

  /**
   * Input for capturing the new name of a created NodeModel
   */
  @ViewChild("createInput", {
    static: false,
  })
  createInput?: ElementRef;

  /**
   * Directives
   */
  @Input() node!: NodeModel;
  @Input() isRoot: boolean = false;
  @Input() path: string[] = [];

  /**
   * Emitters
   */
  @Output() addItem: EventEmitter<{
    path: string[];
    node: NodeModel;
  }> = new EventEmitter<{
    path: string[];
    node: NodeModel;
  }>();

  @Output() removeItem: EventEmitter<{
    path: string[];
  }> = new EventEmitter<{
    path: string[];
  }>();

  /**
   * Contains the breadcrumbs from root parent to child element
   */
  public folderPath: string[] = [];

  /**
   * Component state. Currently, this accepts 'add', 'create' and 'default'.
   */
  public state: NodeComponentState = "default";

  /** Proxy object to hold the information of a NodeModel to be created */
  public nodeProxyModel: { type: string; name?: string } | undefined;

  constructor() {}

  ngOnInit() {
    if (this.isRoot) {
      this.role = "tree";
    } else {
      this.role = this.node.type === "file" ? "none" : "treeitem";
    }

    this.folderPath = [...this.path, this.node.id];
  }

  /**
   * Emit addItem event with the new NodeModel to be added. The value $event.path contains the address
   * of where the new NodeModel will be added.
   */
  saveNewItem() {
    if (this.createInput && this.createInput.nativeElement.value) {
      this.addItem.emit({
        path: this.folderPath,
        node: new NodeModel({
          ...this.nodeProxyModel,
          name: this.createInput.nativeElement.value,
          children: [],
          id: `${this.nodeProxyModel!.type}_${NodeModel.generateNewId()}`,
        }),
      });
    }

    this.cancelCreate();
  }

  cancelCreate() {
    this.nodeProxyModel = undefined;
    this.setState("default");
  }

  /**
   * Emit removeItem event. The value $event.path contains the address
   * of the NodeModel to be removed.
   */
  removeNodeItem() {
    this.removeItem.emit({
      path: this.folderPath,
    });
  }

  /**
   * Intialises the NodeModel proxy and change the component state to 'create'
   * @param type The type of the new NodeModel to be created
   */
  createNewEntity(type: string) {
    this.nodeProxyModel = {
      type,
    };
    this.setState("create");
  }

  /**
   * Change the state of component
   * @param newState The new NodeComponentState.state to set
   */
  setState(newState: NodeComponentState) {
    this.state = newState;
  }

  trackByChildNode(index: number, node: NodeModel) {
    return node.id;
  }
}
