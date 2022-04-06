import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { DataTablesModule } from 'angular-datatables';

import { JQ_TOKEN, JQUERY_PROVIDER } from './jQuery.service';
import { AlexandriaService } from './alexandria.service';
import { DatatablesService } from './datatables.service';

import { AppComponent } from './app.component';
import { StartPageComponent } from './startpage.component';
import { ImprintPageComponent } from './imprint.component';
import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './eventdetails.component';
import { DocumentsComponent } from './documents.component';
import { DocumentDetailsComponent } from './documentdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DaterangePipe } from './daterange.pipe';

const routerConfig: Routes = [
    {
        path: 'start',
        component: StartPageComponent
    },
    {
        path: 'imprint',
        component: ImprintPageComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'event-details/:id',
        component: EventDetailsComponent
    },
    {
        path: 'documents',
        component: DocumentsComponent
    },
    {
        path: 'document-details/:id',
        component: DocumentDetailsComponent
    },
    {
        path: '**',
        redirectTo: '/start',
        pathMatch: 'full'
    }
]


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ImprintPageComponent,
    EventsComponent,
    EventDetailsComponent,
    DocumentsComponent,
    DocumentDetailsComponent,
    DaterangePipe
  ],
  imports: [
    RouterModule.forRoot(routerConfig, {useHash: true}),
    BrowserModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
  	{ provide: AlexandriaService, useClass: AlexandriaService },
    { provide: DatatablesService, useClass: DatatablesService },
    JQUERY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
