import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'daterange'})
export class DaterangePipe implements PipeTransform {

	months = ['', 'Januar', 'Februar', 'März', 'April',
	              'Mai', 'Juni', 'Juli', 'August', 'September',
	              'Oktober', 'November', 'Dezember'];
	              
	formatDate(date) {
        var display = '';
		if (date._day) {
		    display += date._day + ". ";
		}
		if (date._month) {
		    display += this.months[date._month] + " ";
		}
		display += date._year;
		return display
	}
	
	formatDaterange(daterange) {
	    var display = this.formatDate(daterange.start_date)
	    if (daterange.end_date) {
	    	display += " bis " + this.formatDate(daterange.end_date);
	    }
	    return display;
	}

  	transform(daterange: object): string {
    	return this.formatDaterange(daterange);
  	}
}