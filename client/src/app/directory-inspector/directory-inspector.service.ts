import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryInspectorService {

  constructor(private httpClient: HttpClient) { }

  private serverUrl = 'http://localhost:3000';

  inspectFolder(dir: string): Observable<{id: string, directories: string[], files: string[]}> {
    return this.httpClient.get<{id: string, directories: string[], files: string[]}>(this.serverUrl + '/inspect/' + dir);
  }

}
