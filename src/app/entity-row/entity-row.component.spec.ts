import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRowComponent } from './entity-row.component';

describe('EntityRowComponent', () => {
  let component: EntityRowComponent;
  let fixture: ComponentFixture<EntityRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
