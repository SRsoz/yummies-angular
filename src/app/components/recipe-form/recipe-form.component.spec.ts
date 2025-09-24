import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeFormComponent } from './recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../core/core/services/recipe.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let mockRecipeService: any;

  beforeEach(async () => {

    mockRecipeService = {
      getRecipeById: jasmine.createSpy('getRecipeById').and.returnValue(of(null)),
      createRecipe: jasmine.createSpy('createRecipe').and.returnValue(of({})),
      updateRecipe: jasmine.createSpy('updateRecipe').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RecipeFormComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with empty initial values', () => {
    expect(component).toBeTruthy();
    expect(component.recipeForm.get('title')?.value).toBe('');
    expect(component.recipeForm.get('ingredients')?.value).toBe('');
    expect(component.recipeForm.get('instructions')?.value).toBe('');
    expect(component.recipeForm.get('image')?.value).toBe('');
  });

  it('should be invalid if required fields are empty', () => {
    component.recipeForm.get('title')?.setValue('');
    component.recipeForm.get('ingredients')?.setValue('');
    component.recipeForm.get('instructions')?.setValue('');
    expect(component.recipeForm.valid).toBeFalse();

    component.recipeForm.get('title')?.setValue('Test Recipe');
    component.recipeForm.get('ingredients')?.setValue('ing1, ing2');
    component.recipeForm.get('instructions')?.setValue('Step 1');
    expect(component.recipeForm.valid).toBeTrue();
  });

  it('should call createRecipe on submit if in create mode', () => {
    component.isEditMode = false;
    component.recipeForm.setValue({
      title: 'Test Recipe',
      ingredients: 'ing1, ing2',
      instructions: 'Step 1',
      image: ''
    });

    component.submit();
    expect(mockRecipeService.createRecipe).toHaveBeenCalled();
    expect(mockRecipeService.updateRecipe).not.toHaveBeenCalled();
  });
});
