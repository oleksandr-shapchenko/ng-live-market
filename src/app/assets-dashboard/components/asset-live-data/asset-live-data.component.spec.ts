import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiveDataComponent } from './asset-live-data.component';

describe('AssetLiveDataComponent', () => {
  let component: AssetLiveDataComponent;
  let fixture: ComponentFixture<AssetLiveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetLiveDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
