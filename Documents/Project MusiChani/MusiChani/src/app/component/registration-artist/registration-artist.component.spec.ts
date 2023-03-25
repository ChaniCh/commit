import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationArtistComponent } from './registration-artist.component';

describe('RegistrationArtistComponent', () => {
  let component: RegistrationArtistComponent;
  let fixture: ComponentFixture<RegistrationArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
