import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryInfo } from '../shared/directory-info.model';

@Injectable({
  providedIn: 'root'
})
export class DirectoryInspectorService {

  constructor(private httpClient: HttpClient) { }

  private serverUrl = 'http://localhost:3000';

  inspectDirectory(directory: DirectoryInfo): Promise<DirectoryInfo> {
    return this.httpClient.get<DirectoryInfo>(this.serverUrl + "/inspect/" + directory.id)
      .toPromise().then(newDirectoryInfo => new DirectoryInfo(directory.id, directory.parentDirectory, newDirectoryInfo.directories, newDirectoryInfo.files));
  }

  inspectDirectoryChildrenTreeNodes(directory: DirectoryInfo) {
    this.inspectDirectory(directory)
  }
}
