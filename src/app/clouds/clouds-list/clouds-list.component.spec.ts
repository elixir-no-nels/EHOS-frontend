import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudsListComponent } from './clouds-list.component';

describe('CloudsListComponent', () => {
  let component: CloudsListComponent;
  let fixture: ComponentFixture<CloudsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
