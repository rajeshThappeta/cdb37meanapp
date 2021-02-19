import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileupdateComponent } from './userprofileupdate.component';

describe('UserprofileupdateComponent', () => {
  let component: UserprofileupdateComponent;
  let fixture: ComponentFixture<UserprofileupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
