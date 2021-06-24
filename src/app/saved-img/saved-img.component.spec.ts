import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedImgComponent } from './saved-img.component';

describe('SavedImgComponent', () => {
  let component: SavedImgComponent;
  let fixture: ComponentFixture<SavedImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
