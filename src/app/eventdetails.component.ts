import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlexandriaService, Event } from './alexandria.service';

@Component({
  selector: 'event-details',
  templateUrl: 'eventdetails.component.html'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  
  event: Event;
  related_events: Event[];
  document_rows: object[];
  
  private _subscription: any
  
  constructor(private _alexandriaService: AlexandriaService,
              private _route: ActivatedRoute) {}
  

  ngOnInit(): void {
  
  	let fetch_rows = (event) => {
  		let documents = this._alexandriaService.getRelatedDocuments(event);
  		documents = this._alexandriaService.addThumbnails(documents);
  		let rows = this._alexandriaService.buildRows(documents);
  		console.log(rows);
  		return rows;
  	}
  
  	this._subscription = this._route.params.subscribe(
  		params => {
       		this.event = this._alexandriaService.getEvent(params['id']);
       		this.related_events = this._alexandriaService.getCrossReferences(this.event);
      		this.document_rows = fetch_rows(this.event);
		}
    );
  }
  
  ngOnDestroy() {
      this._subscription.unsubscribe();
  }
}