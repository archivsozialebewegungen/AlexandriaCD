import { Injectable, Inject } from '@angular/core';
import * as _ from "lodash";

declare var alexandria: any;

export interface AlexDate {
    _day: number;
    _month: number;
    _year: number;
}

export interface DateRange {
    start_date: AlexDate;
    end_date: AlexDate;
    sequence_number: number;
}

export interface Event {
    _id: number;
    daterange: DateRange;
    description: string;
    next_id: number;
    previous_id: number;
    related_documents: number[];
    related_events: number[];
}

export interface DokumentTyp {
	description: string;
}

export interface FileInfo {
	_id: number;
	document_id: number;
	filetype: string;
	page: number;
	resolution: number|null;
	thumbnail: string;
	display_file: string;
	multimedia_file: string;
}

export interface Dokument {
	_id: number;
    description: string;
    thumbnail: string;
    display_file: string;
    pdf: string;
    related_events: number[];
    document_type: DokumentTyp;
    file_infos: FileInfo[];
    next_id: number;
    previous_id: number;
}

@Injectable()

export class AlexandriaService {

	getStartPageHtml() {
		return alexandria.pagecontent.startpage;
	}

	getImprintPageHtml() {
		return alexandria.pagecontent.imprint;
	}
	
	getAllEvents(): Event[] {
		return alexandria.data.events;
	}

	getAllDocuments(): Dokument[] {
		return alexandria.data.documents;
	}
	
	getEvent(id: number): Event {
	
		for (let event of alexandria.data.events) {
			if (event._id == id) {
				return event;
			}
		}
		// Just a dummy return statement
		return alexandria.data.events[0]
	}

	getDocument(id: number): Dokument {
	
		for (let document of alexandria.data.documents) {
			if (document._id == id) {
				return document;
			}
		}
		// Just a dummy return statment
		return alexandria.data.documents[0]
	}
	
	getDocuments(document_ids: number[]): Dokument[] {
	
		let documents: Dokument[] = [];
		let index = -1;
		for (let document_id of document_ids) {
			documents[++index] = this.getDocument(document_id);
		}
		return documents;
	
	}
	
	addThumbnails(objects: any[]): any[] {
		return _.map(
			objects, 
			(object: any) => {
				return this.addThumbnailPath(object);
			},
		);
	}
	
	buildRows(objects: any[]) {
	
		objects = this.addThumbnails(objects);
		
		let rows = _.reduce(
			objects,
			function(rows, object) {
				var current_row = rows[rows.length-1];
				if (current_row.length == 3) {
					rows.push([]);
					current_row = rows[rows.length-1]
				};
				current_row.push(object);
				return rows;
			},
			[<any[]>[]]
		)
		return rows;	
	}
	
	getEvents(event_ids: number[]) {
	
		let events = [];
		let index = -1;
		for (let event_id of event_ids) {
			events[++index] = this.getEvent(event_id) as Event;
		}
		return events;
	}
	
	getRelatedDocuments(event: Event) {
	
		return this.getDocuments(event.related_documents);
	}
	
	getRelatedEvents(document: Dokument) {
	
		return this.getEvents(document.related_events);
	}
	
	getCrossReferences(event: Event) {
	
		return this.getEvents(event.related_events);
	}

	addThumbnailPath(file_info: FileInfo): any {
		let filename = this.createFilename(file_info, '.png');
		file_info.thumbnail = "assets/thumbnails/" + filename;
		return file_info;
	}
	
	addDisplayFilePath(file_info: FileInfo): any {
		let filename = this.createFilename(file_info, '.png');
		file_info.display_file = "assets/screen/" + filename;
		return file_info;
	}
	
	addMultimediaFilePath(file_info: FileInfo): any {
		let filename = this.createFilename(file_info, "." + file_info.filetype);
		file_info.multimedia_file = "assets/multimedia/" + filename;
		return file_info;
	}
	
	addPdfPath(document: Dokument) {
		let filename = this.createFilename(document, '.pdf');
		document.pdf = "assets/pdf/" + filename;
		return document;
	}
	
	private createFilename(object: any, extension: String) {
		let filename = object._id + '';
		while(filename.length < 8){
			filename = '0' + filename;
		}
		return filename + extension;
	}
	
}