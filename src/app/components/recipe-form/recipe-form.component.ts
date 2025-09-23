import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from '../../core/core/services/recipe.service';
import { Recipe } from '../../core/core/models/recipe';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeId!: string;
  recipeForm!: FormGroup;
  isLoading = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;

    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        this.recipeForm = this.fb.group({
          title: [recipe.title, Validators.required],
          ingredients: [recipe.ingredients.join(', '), Validators.required],
          instructions: [recipe.instructions, Validators.required],
          image: [recipe.image]
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipe:', err);
        this.errorMessage = 'Could not load recipe';
        this.isLoading = false;
      }
    });
  }

  updateRecipe(): void {
  if (this.recipeForm.invalid) return;

  const updatedRecipe: Recipe = {
    ...this.recipeForm.value,
    ingredients: this.recipeForm.value.ingredients.split(',').map((i: string) => i.trim())
  };

  this.recipeService.updateRecipe(this.recipeId, updatedRecipe).subscribe({
    next: (recipe) => {
      this.recipeForm.patchValue({
        title: recipe.title,
        ingredients: recipe.ingredients.join(', '),
        instructions: recipe.instructions,
        image: recipe.image
      });
      alert('Recipe updated successfully!');
    },
    error: (err) => console.error('Update failed:', err)
  });
}
  cancel(): void {
    this.location.back();
  }
}
