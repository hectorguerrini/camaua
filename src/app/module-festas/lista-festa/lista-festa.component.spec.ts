import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFestaComponent } from './lista-festa.component';

describe('ListaFestaComponent', () => {
  let component: ListaFestaComponent;
  let fixture: ComponentFixture<ListaFestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
