import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMonoComponent } from './ngx-mono.component';

describe('NgxMonoComponent', () => {
  let component: NgxMonoComponent;
  let fixture: ComponentFixture<NgxMonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMonoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
