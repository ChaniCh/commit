import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerPageComponent } from './singer-page.component';

describe('SingerPageComponent', () => {
  let component: SingerPageComponent;
  let fixture: ComponentFixture<SingerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
