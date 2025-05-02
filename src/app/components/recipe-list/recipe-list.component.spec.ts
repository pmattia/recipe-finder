import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RecipePreview } from '../../models/recipe-preview.model';
import { ActivatedRoute } from '@angular/router';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  const mockRecipes: RecipePreview[] = [
    { id: '1', name: 'Recipe 1', category: 'Category 1', thumb: 'thumb1.jpg' },
    { id: '2', name: 'Recipe 2', category: 'Category 2', thumb: 'thumb2.jpg' },
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
              data: {
                results: mockRecipes, // Mocked data for 'results'
              },
            },
            params: of({}),
            queryParams: of({}),
            data: of({ results: mockRecipes }), // Observable for 'results'
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
  });

  it('should display "No recipes found" when recipes$ is empty', () => {
    component.recipes$ = of([]);
    fixture.detectChanges();

    const noRecipesMessage = fixture.debugElement.query(By.css('p'));
    expect(noRecipesMessage.nativeElement.textContent).toContain('No recipes found');
  });

  it('should display the correct number of recipes', () => {
    component.recipes$ = of(mockRecipes);
    fixture.detectChanges();

    const recipeCards = fixture.debugElement.queryAll(By.css('recipe-card'));
    expect(recipeCards.length).toBe(mockRecipes.length);
  });

  it('should navigate to details when a recipe card is clicked', () => {
    spyOn(component, 'goToDetails');
    component.recipes$ = of(mockRecipes);
    fixture.detectChanges();

    const recipeCard = fixture.debugElement.query(By.css('recipe-card'));
    recipeCard.triggerEventHandler('onDetailClick', mockRecipes[0].id);

    expect(component.goToDetails).toHaveBeenCalledWith(mockRecipes[0].id);
  });
});