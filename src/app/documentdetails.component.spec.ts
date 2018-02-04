import { Injectable } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DocumentDetailsComponent } from './documentdetails.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Params, ActivatedRoute} from '@angular/router';
import { DaterangePipe } from './daterange.pipe';
import { JQUERY_PROVIDER } from './jQuery.service';
import { AlexandriaService } from './alexandria.service';
import { DialogService } from "ng2-bootstrap-modal";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {
    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
}

describe('DocumentDetailsComponent', () => {
    
  beforeEach(async(() => {
      let activatedRouteStub = new ActivatedRouteStub();
      activatedRouteStub.testParams = {'id': '3169'}
    TestBed.configureTestingModule({
      declarations: [
        DocumentDetailsComponent,
        DaterangePipe
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AlexandriaService, useClass: AlexandriaService },
        { provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: '3169' })
          }
        },
        { provide: DialogService, useClass: DialogService },
        JQUERY_PROVIDER
      ],

    }).compileComponents();
  }));

  it('should create the document details component', async(() => {
    const fixture = TestBed.createComponent(DocumentDetailsComponent);
    const details = fixture.debugElement.componentInstance;
    expect(details).toBeTruthy();
  }));

  it('should load documentdetails for document 3169', async(() => {
      
      const fixture = TestBed.createComponent(DocumentDetailsComponent);
      let activatedRoute: any = fixture.debugElement.injector.get(ActivatedRoute);
      activatedRoute.testParams = { id: 3169 };
      fixture.detectChanges();      
      const panelBody = fixture.debugElement.query(By.css('.panel-body'));
      expect(panelBody).toBeTruthy();
      const nativeElement = panelBody.nativeElement;
      expect(nativeElement.textContent).toBe('Flugblatt der Demokratischen Mitte: "Der Rote punkt ist nicht rot."')
    }));
})