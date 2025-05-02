import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeyword'
})
export class HighlightKeywordPipe implements PipeTransform {

  transform(title: string, keyword: string): string {
    if (!title || !keyword) {
      return title || '';
    }

    // Escape special characters in the keyword for use in a regular expression
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a regular expression to find the keyword (case-insensitive)
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');

    // Replace the keyword with a <strong> wrapped version
    return title.replace(regex, '<strong>$1</strong>');
  }
}