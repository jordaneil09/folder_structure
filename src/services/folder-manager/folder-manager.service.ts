import { Injectable } from '@angular/core';
import { NodeModel } from 'src/models/node.model';

@Injectable({
  providedIn: 'root'
})
export class FolderManagerService {
  private mockNode = {
    name: 'root', 
    id: 'root_0',
    children: [
      {
        name: 'temp', 
        id: 'folder_0',
        children: [
          {
            name: 'testing.txt', 
            id: 'file_0',
            children: [],
            type: 'file'
          },
          {
            name: 'index.html', 
            id: 'file_1',
            children: [],
            type: 'file'
          }
        ],
        type: 'folder'
      }
    ],
    type: 'folder'
  };

  /**
   * The root NodeModel object
   */
  private rootFolderObj: NodeModel;

  constructor() { 
    this.rootFolderObj = new NodeModel(this.mockNode);
  }

  
  public getRootFolder(): NodeModel {
    return this.rootFolderObj;
  }

  /**
   * Inserts a new NodeModel to the children array of the specified parent path
   * @param paths The NodeModel parent path
   * @param node The new NodeModel to be added
   */
  public addNewItem(paths: string[], node: NodeModel) {
    const nodeModel = this.getNodeByPath(paths, [ this.rootFolderObj ]);
    if(nodeModel) {
      nodeModel.children.push(node);
    }
  }

  /**
   * Removes a NodeModel on the specified path
   * @param paths The NodeModel path
   */
  public removeNodeItem(paths: string[]) {
    const nodeModel = this.getNodeByPath(paths, [ this.rootFolderObj ]);
    if(nodeModel) {
      nodeModel.type = 'unset';
    }
  }

  /**
   * Retrieves the NodeModel on the specified path
   * @param paths The array of NodeModel id
   * @param nodes The array of NodeModel as the target source
   * @returns Found NodeModel. Nullabe. 
   */
  public getNodeByPath(paths: string[], nodes: NodeModel[]): NodeModel | null {
    const destructuredPaths: string[] = [...paths];

    const [ targetPath ] = destructuredPaths.splice(0, 1);
    if(targetPath) {
      const findNode = nodes?.find((node: NodeModel) => node.id === targetPath);
      if(findNode) {
        if(destructuredPaths.length > 0) {
          return this.getNodeByPath(destructuredPaths, findNode.children);
        } else {
          return findNode;
        }
      }
    }

    return null;
  }

  /**
   * Exports the folder structure into JSON format
   * @returns JSON format of folder structure
   */
  public export(): any {
    return this.rootFolderObj.export()
  }
}
