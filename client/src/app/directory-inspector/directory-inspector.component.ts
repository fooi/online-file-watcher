import { Component, OnInit } from '@angular/core';
import { TreeNode, MenuItem, Message } from 'primeng/api';

import { DirectoryInspectorService } from './directory-inspector.service';

@Component({
  selector: 'app-directory-inspector',
  templateUrl: './directory-inspector.component.html',
  styleUrls: ['./directory-inspector.component.css']
})
export class DirectoryInspectorComponent implements OnInit {

  msgs: Message[];

  items: TreeNode[];

  selectedItem: TreeNode;

  menuItems: MenuItem[];

  loading: boolean;

  private readonly hiddenRoot = { label: '', children: [], leaf: false, type: 'root' };

  constructor(private directoryInspectorService: DirectoryInspectorService) { }

  ngOnInit() {
    this.loading = true;
    this.items = this.hiddenRoot.children;
    this.menuItems = [
      { label: 'Watch', icon: 'fa-eye', command: (event) => this.watchFile() },
      { label: 'Download', icon: 'fa-download', command: (event) => this.downloadFile() }
    ];
    this.loadNode(this.hiddenRoot)
      .then(() => { this.loading = false; });
  }

  resolveNodeId(node: TreeNode) {
    if (node.parent) {
      return this.resolveNodeId(node.parent) + '/' + node.label;
    }
    return node.label;
  }

  private isParentChildRelationship(possibleParent: TreeNode, possibleChild: TreeNode) {
    if (possibleParent && possibleChild) {
      if (possibleChild === possibleParent) {
        return true;
      }
      return this.isParentChildRelationship(possibleParent, possibleChild.parent);
    }
    return false;
  }

  removeNode(node: TreeNode) {
    if (node === this.hiddenRoot) {
      this.hiddenRoot.children.forEach(this.removeNode);
      return;
    }
    if (this.isParentChildRelationship(node, this.selectedItem)) {
      this.selectedItem = null;
    }
    node.parent.children.splice(node.parent.children.indexOf(node), 1);
  }

  loadNode(node: TreeNode) {
    const nodeId = this.resolveNodeId(node);
    // tricks to load children properly by a redundant mapping
    node.children.map(child => child).forEach(child => {
      this.removeNode(child);
    });
    return this.directoryInspectorService.inspectFolder(nodeId)
      .toPromise()
      .then(info => {
        info.directories.forEach(dir => {
          node.children.push({
            label: dir,
            expandedIcon: 'fa-folder-open',
            collapsedIcon: 'fa-folder',
            children: [],
            leaf: false,
            expanded: false,
            type: 'directory',
            parent: node,
          });
        });
        info.files.forEach(file => {
          node.children.push({
            label: file,
            icon: 'fa-file',
            leaf: true,
            type: 'file',
            parent: node,
          });
        });
      });
  }

  watchFile() {

  }

  downloadFile() {

  }

  nodeExpand($event) {
    const showLoadingTimer = setTimeout(() => { this.loading = true; }, 200);
    this.loadNode($event.node)
      .then(() => { clearTimeout(showLoadingTimer); })
      .then(() => { this.loading = false; });
  }

  nodeSelect($event) {
    if (!$event.node.leaf) {
      if (!$event.node.expanded) {
        this.nodeExpand($event);
      }
      $event.node.expanded = !$event.node.expanded;
    }
  }

}
