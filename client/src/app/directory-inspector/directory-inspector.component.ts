import { Component, OnInit } from '@angular/core';

import { TreeNode, MenuItem, Message } from 'primeng/api';
import { DirectoryInspectorService } from './directory-inspector.service';
import { ROOT_DIRECTORY, DirectoryInfo, DirectoryInfo } from '../shared/directory-info.model';

@Component({
  selector: 'app-directory-inspector',
  templateUrl: './directory-inspector.component.html',
  styleUrls: ['./directory-inspector.component.css']
})
export class DirectoryInspectorComponent implements OnInit {

  msgs: Message[] = [];

  items: TreeNode[] = [];

  selectedItem: TreeNode;

  menuItems: MenuItem[] = [];

  loading: boolean;

  constructor(private directoryInspectorService: DirectoryInspectorService) { }

  ngOnInit() {
    this.items.push({
      label: '/',
      data: null,
      icon: null,
      expandedIcon: "fa-folder-open",
      collapsedIcon: "fa-folder",
      children: [],
      leaf: false,
      expanded: false,
      type: 'directory',
      parent: null,
      partialSelected: false,
      styleClass: '',
      draggable: false,
      droppable: false,
      selectable: true,
    })
    this.menuItems = [
      { label: 'Watch', icon: 'fa-watch', command: (event) => this.watchFile() },
      { label: 'Download', icon: 'fa-close', command: (event) => this.downloadFile() }
    ];
  }

  transformNode(directoryInfo: DirectoryInfo): TreeNode {
    return {
      label: directoryInfo.id,
      data: directoryInfo,
      icon: null,
      expandedIcon: 'fa-folder-open',
      collapsedIcon: 'fa-folder',
      children: [],
      leaf: false,
      expanded: false,
      type: 'directory',
      parent: this.transformNode(directoryInfo.parentDirectory)
    }
  }

  loadNode($event) {
    console.log($event.node);
    $event.node.
    // console.log(this.selectedItem);
  }

  watchFile() {

  }

  downloadFile() {

  }

  nodeSelect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
  }

  nodeUnselect(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }

}
