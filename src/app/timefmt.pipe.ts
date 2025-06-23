import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefmt',
  standalone: true
})
export class TimefmtPipe implements PipeTransform {

  transform(value: number): string {

    var ms = value % 1000;
    value = (value - ms) / 1000;
    var secs = value % 60;
    value = (value - secs) / 60;
    var mins = value % 60;
    var hrs = (value - mins) / 60;

    var numVars = 3;
    if (secs== 0) {
      numVars--;
    }
    if (mins== 0) {
      numVars--;
    }
    if (hrs== 0) {
      numVars--;
    }
    
    var str = '';
    if (numVars == 3) {
      if (hrs == 1) {
        str = hrs + " hour, ";
      } else {
        str = hrs + " hours, ";
      }
      if (mins == 1) {
        str = mins + " minute, and ";
      } else {
        str = mins + " minutes, and ";
      }
      if (secs == 1) {
        str = secs + " second";
      } else {
        str = secs + " seconds";
      }
    }
    if (numVars == 2) {
      if (hrs == 0) {
        if (mins == 1) {
          str = mins + " minute, and ";
        } else {
          str = mins + " minutes, and ";
        }
        if (secs == 1) {
          str = secs + " second";
        } else {
          str = secs + " seconds";
        }
      }
      if (mins == 0) {
        if (hrs == 1) {
          str = hrs + " hour, and ";
        } else {
          str = hrs + " hours, and ";
        }
        if (secs == 1) {
          str = secs + " second";
        } else {
          str = secs + " seconds";
        }
      }
      if (secs == 0) {
        if (hrs == 1) {
          str = hrs + " hour and ";
        } else {
          str = hrs + " hours and ";
        }
        if (mins == 1) {
          str = mins + " minute";
        } else {
          str = mins + " minutes";
        }
      }
    }
    if (numVars == 1) {
      if (hrs != 0) {
        if (hrs == 1) {
          str = hrs + " hour";
        } else {
          str = hrs + " hours";
        }
      }
      if (mins != 0) {
        if (mins == 1) {
          str = mins + " minute";
        } else {
          str = mins + " minutes";
        }
      }
      if (secs != 0) {
        if (secs == 1) {
          str = secs + " second";
        } else {
          str = secs + " seconds";
        }
      }
    }
    if (numVars == 0) {
      str = value + "milliseconds";
    }
    return str;
  }

}
