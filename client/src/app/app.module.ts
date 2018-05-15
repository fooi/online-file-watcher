import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeModule } from 'primeng/tree';

import { AppComponent } from './app.component';
import { DirectoryInspectorComponent } from './directory-inspector/directory-inspector.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectoryInspectorComponent,
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
