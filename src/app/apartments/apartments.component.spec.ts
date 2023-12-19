import { ComponentFixture, TestBed } from '@angular/core/testing';
 import {MatCardModule} from '@angular/material/card'; 
import { ApartmentsComponent } from './apartments.component';

describe('BookingComponent', () => {
  let component: ApartmentsComponent;
  let fixture: ComponentFixture<ApartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentsComponent]
    });
    fixture = TestBed.createComponent(ApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
