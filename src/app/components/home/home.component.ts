import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from '../../core/core/services/recipe.service';
import { Recipe } from '../../core/core/models/recipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.errorMessage = 'Could not load recipes.';
        this.isLoading = false;
      }
    });
  }

  get filteredRecipes(): Recipe[] {
    if (!this.searchTerm) return this.recipes;
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteRecipe(id: string) {
  if (!confirm('Are you sure you want to delete this recipe?')) return;

  this.recipeService.deleteRecipe(id).subscribe({
    next: () => {
      this.recipes = this.recipes.filter(r => r._id !== id);
      console.log('Recipe deleted successfully');
    },
    error: (err) => console.error('Failed to delete recipe', err)
  });
}
}
