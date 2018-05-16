import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileWatcherComponent } from './file-watcher.component';

describe('FileWatcherComponent', () => {
  let component: FileWatcherComponent;
  let fixture: ComponentFixture<FileWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
