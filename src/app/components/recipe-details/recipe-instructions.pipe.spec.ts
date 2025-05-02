import { RecipeInstructionsPipe } from './recipe-instructions.pipe';

describe('RecipeInstructionsPipe', () => {
  let pipe: RecipeInstructionsPipe;

  beforeEach(() => {
    pipe = new RecipeInstructionsPipe();
  });

  it('should return an empty string if the input is null or undefined', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should sanitize HTML special characters', () => {
    const input = '<script>alert("XSS")</script>';
    const expectedOutput = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });

  it('should replace newlines with <br> tags', () => {
    const input = 'Line 1\nLine 2\r\nLine 3\rLine 4';
    const expectedOutput = 'Line 1<br>Line 2<br>Line 3<br>Line 4';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });

  it('should sanitize and replace newlines in the same input', () => {
    const input = '<div>Line 1</div>\nLine 2';
    const expectedOutput = '&lt;div&gt;Line 1&lt;/div&gt;<br>Line 2';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });
});