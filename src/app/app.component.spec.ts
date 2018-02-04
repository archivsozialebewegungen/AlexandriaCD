import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have the four navigation links', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const menuLinks = compiled.querySelectorAll('a');
    expect(menuLinks.length).toBe(4);
    expect(menuLinks[0].textContent).toBe('Alexandria');
    expect(menuLinks[0].getAttribute('href')).toBe('#/start');
    expect(menuLinks[1].textContent).toBe('Ereignisse');
    expect(menuLinks[1].getAttribute('href')).toBe('#/events');
    expect(menuLinks[2].textContent).toBe('Dokumente');
    expect(menuLinks[2].getAttribute('href')).toBe('#/documents');
    expect(menuLinks[3].textContent).toBe('Impressum');
    expect(menuLinks[3].getAttribute('href')).toBe('#/imprint');
  }));
});
