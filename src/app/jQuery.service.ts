import { InjectionToken } from '@angular/core';

export const JQ_TOKEN = new InjectionToken('jQuery');

export function jQueryFactory() {
    return window[<any>'jQuery'];
}

export const JQUERY_PROVIDER = [
    { provide: JQ_TOKEN, useFactory: jQueryFactory },
];