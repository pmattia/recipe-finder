import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recipeInstructions'
})
export class RecipeInstructionsPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return '';
        }

        // Sanitize the input by escaping HTML special characters
        const sanitizedValue = value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        // Replace carriage returns and newlines with <br> tags
        return sanitizedValue.replace(/(\r\n|\r|\n)/g, '<br>');
    }
}