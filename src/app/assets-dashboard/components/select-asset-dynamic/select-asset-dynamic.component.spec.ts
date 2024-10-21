import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssetDynamicComponent } from './select-asset-dynamic.component';

describe('SelectAssetDynamicComponent', () => {
  let component: SelectAssetDynamicComponent;
  let fixture: ComponentFixture<SelectAssetDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAssetDynamicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAssetDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
