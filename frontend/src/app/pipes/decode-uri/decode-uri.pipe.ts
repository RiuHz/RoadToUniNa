import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeURI',
})
export class DecodeURIPipe implements PipeTransform {
  transform(link: string): string {
    const title = link.replace('/wiki/', '');

    return decodeURIComponent(title);
  }
}
