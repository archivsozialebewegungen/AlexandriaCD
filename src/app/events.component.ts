import { Component, OnInit, Inject } from '@angular/core';
import { AlexandriaService } from './alexandria.service';
import { DatatablesService } from './datatables.service';
import { JQ_TOKEN } from './jQuery.service';

@Component({
  selector: 'events',
  templateUrl: 'events.component.html'
})

export class EventsComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  
  events;
  
  constructor(
  	@Inject(JQ_TOKEN) private $: any,
  	private _alexandriaService: AlexandriaService,
  	private _datatablesService: DatatablesService
  ) {}

  ngOnInit(): void {

	let columnOptions: DataTables.ColumnSettings[] = [
		{
			type: 'alexdate',
		},
		{
			orderable:
			false}
	];

    this.dtOptions = this._datatablesService.getDatatableOptions(columnOptions);
	this.events = this._alexandriaService.getAllEvents();
	
	// Extracting the (first) date from the link in the column
	// using a regular expression
	let alexdateRe = /(\d{10})/;
	let extractAlexdate = function(alexdatelink) {
		var matchData = alexdateRe.exec(alexdatelink);
		return matchData[1]
	}

	this.$.fn.dataTableExt.oSort['alexdate-asc'] = function(x,y){
		var xint = extractAlexdate(x);
		var yint = extractAlexdate(y);
		return ((xint < yint) ? -1 : ((xint > yint) ?  1 : 0));
	}
	this.$.fn.dataTableExt.oSort['alexdate-desc'] = function(x,y){
		var xint = extractAlexdate(x);
		var yint = extractAlexdate(y);
		return ((xint < yint) ? 1 : ((xint > yint) ?  -1 : 0));
	}

  }
  
}