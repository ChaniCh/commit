import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPlaysComponent } from './song-plays.component';

describe('SongPlaysComponent', () => {
  let component: SongPlaysComponent;
  let fixture: ComponentFixture<SongPlaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongPlaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongPlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
