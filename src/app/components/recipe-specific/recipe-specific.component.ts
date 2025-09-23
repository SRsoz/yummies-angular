import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../core/core/services/recipe.service';
import { Recipe } from '../../core/core/models/recipe';

@Component({
  selector: 'recipe-specific',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-specific.component.html',
  styleUrls: ['./recipe-specific.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeSpecificComponent implements OnInit {
  recipe: Recipe | null = null;
  recipeId: string | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching recipe:', err);
          this.errorMessage = 'Recipe not found';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'No recipe id provided';
      this.isLoading = false;
    }
  }
}
