import { Component, ElementRef, ViewChild } from '@angular/core';
import { NodeModel } from 'src/models/node.model';
import { FolderManagerService } from 'src/services/folder-manager/folder-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('folderStructureJSONView', {static: true}) folderStructureJSONView!: ElementRef;


  public folderStructure: NodeModel;

  constructor(public folderManager: FolderManagerService) {
    this.folderStructure = folderManager.getRootFolder();
  }

  ngAfterViewInit() {
    this.updateJSONView();
  }

  public addNewItem($event: { path: string[], node: NodeModel }) {
    this.folderManager.addNewItem($event.path, $event.node);
    this.updateJSONView();
  }

  public removeNodeItem($event: { path: string[] }) {
    this.folderManager.removeNodeItem($event.path);
    this.updateJSONView();
  }

  updateJSONView() {
    const exportedJSON = this.folderManager.export();
    this.folderStructureJSONView.nativeElement.value = JSON.stringify(exportedJSON, undefined, 4);
  }
}
