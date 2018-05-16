import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeModule } from 'primeng/tree';

import { AppComponent } from './app.component';
import { DirectoryInspectorComponent } from './directory-inspector/directory-inspector.component';
import { FileWatcherComponent } from './file-watcher/file-watcher.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryInspectorComponent,
    FileWatcherComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ContextMenuModule,
    TreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
