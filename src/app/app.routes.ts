import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeAllComponent } from './components/recipe-all/recipe-all.component';
import { RecipeSpecificComponent } from './components/recipe-specific/recipe-specific.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipeAllComponent },
  { path: 'recipes/:id', component: RecipeSpecificComponent },
  { path: 'create', component: RecipeFormComponent },
  { path: 'update/:id', component: RecipeFormComponent },
];