import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SearchRecipeComponent } from './search-recipe.component';

describe('SearchRecipeComponent', () => {
  let component: SearchRecipeComponent;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
    });
    component = TestBed.createComponent(SearchRecipeComponent).componentInstance;
  });

  describe('sanitizedInput', () => {
    it('should return an empty string for null or undefined input', () => {
      expect(component['sanitizedInput'](null)).toBe('');
      expect(component['sanitizedInput'](undefined as unknown as string)).toBe('');
    });

    it('should remove HTML special characters', () => {
      const input = '<script>alert("XSS")</script>';
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('scriptalertXSSscript');
    });

    it('should remove ampersands (&)', () => {
      const input = 'test&value';
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('testvalue');
    });

    it('should remove single and double quotes', () => {
      const input = `"test'value"`;
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('testvalue');
    });

    it('should handle mixed malicious input', () => {
      const input = `<script>alert('XSS')</script>&"test'value"`;
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('scriptalertXSSscripttestvalue');
    });

    it('should not modify safe input', () => {
      const input = 'pizza';
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('pizza');
    });

    it('should handle input with only spaces', () => {
      const input = '   ';
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('');
    });
    
    it('should handle input with complex special characters', () => {
      const input = '<div>@#$%^&*()</div>';
      const sanitized = component['sanitizedInput'](input);
      expect(sanitized).toBe('divdiv');
    });
  });

    
});