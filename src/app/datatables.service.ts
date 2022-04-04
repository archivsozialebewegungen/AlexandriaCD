import { Injectable } from '@angular/core';

@Injectable()

export class DatatablesService {

	getDatatableOptions(columnOptions: any) {
	
    	let dtOptions: DataTables.Settings = {
			language: this.getLanguageSettings(),
			columns: columnOptions
		};
    	return dtOptions;

	}
	
	private getLanguageSettings() {
		let languageSettings: DataTables.LanguageSettings = {
  			emptyTable: "Keine Daten in der Tabelle vorhanden",
			info: "_START_ bis _END_ von _TOTAL_ Einträgen",
			infoEmpty: "Keine Einträge anzuzeigen",
			infoFiltered: "(gefiltert aus _MAX_ Einträgen)",
			infoPostFix:  "",
			thousands: ".",
			lengthMenu: "_MENU_ Einträge anzeigen",
			loadingRecords: "Wird geladen...",
			processing: "Bitte warten...",
			search: "Einträge filtern ",
			zeroRecords: "Keine Einträge vorhanden.",
			paginate: {
				first: "Start",
				last: "Ende",
				next: "weiter",
				previous: "zurück"
			},
			aria: {
				sortAscending: " aktivieren, um Spalte aufsteigend zu sortieren",
				sortDescending: " aktivieren, um Spalte absteigend zu sortieren"
			}
		};
		return languageSettings; 
	}
}