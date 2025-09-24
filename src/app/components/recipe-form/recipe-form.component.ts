import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from '../../core/core/services/recipe.service';
import { Recipe } from '../../core/core/models/recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeId?: string;
  recipeForm!: FormGroup;
  isLoading = true;
  errorMessage = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEditMode = !!this.recipeId;

    if (this.isEditMode) {
      this.recipeService.getRecipeById(this.recipeId!).subscribe({
        next: (recipe) => {
          if (recipe) {
            this.recipeForm = this.createForm(recipe);
          } else {
            console.warn('Recipe not found!');
            this.errorMessage = 'Recipe not found';
          this.recipeForm = this.createForm();
          } 
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching recipe:', err);
          this.errorMessage = 'Could not load recipe';
          this.isLoading = false;
        }
      });
    } else {
      this.recipeForm = this.createForm();
      this.isLoading = false;
    }
  }

  private createForm(recipe?: Recipe): FormGroup {
    return this.fb.group({
      title: [recipe?.title || '', Validators.required],
      ingredients: [recipe?.ingredients?.join(', ') || '', Validators.required],
      instructions: [recipe?.instructions || '', Validators.required],
      image: [recipe?.image || '']
    });
  }

  submit(): void {
    if (this.recipeForm.invalid) return;

    const recipeData: Recipe = {
      ...this.recipeForm.value,
      ingredients: this.recipeForm.value.ingredients.split(',').map((i: string) => i.trim())
    };

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipeId!, recipeData).subscribe({
        next: () => {
          alert('Recipe updated successfully!');
          this.router.navigate(['/']);
          },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.recipeService.createRecipe(recipeData).subscribe({
        next: () => {
          alert('Recipe created successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Create failed:', err)
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}