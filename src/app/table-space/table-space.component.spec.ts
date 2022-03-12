import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSpaceComponent } from './table-space.component';

describe('TableSpaceComponent', () => {
  let component: TableSpaceComponent;
  let fixture: ComponentFixture<TableSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
