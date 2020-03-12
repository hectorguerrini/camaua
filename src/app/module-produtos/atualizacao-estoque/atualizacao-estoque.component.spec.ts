import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizacaoEstoqueComponent } from './atualizacao-estoque.component';

describe('AtualizacaoEstoqueComponent', () => {
  let component: AtualizacaoEstoqueComponent;
  let fixture: ComponentFixture<AtualizacaoEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizacaoEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizacaoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
