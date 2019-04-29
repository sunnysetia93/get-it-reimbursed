import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimburseComponent } from './reimburse.component';

describe('ReimburseComponent', () => {
  let component: ReimburseComponent;
  let fixture: ComponentFixture<ReimburseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimburseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
