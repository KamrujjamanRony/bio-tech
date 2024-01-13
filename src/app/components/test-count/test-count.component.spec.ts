import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCountComponent } from './test-count.component';

describe('TestCountComponent', () => {
  let component: TestCountComponent;
  let fixture: ComponentFixture<TestCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
