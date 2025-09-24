import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
   private apiUrl = 'http://localhost:4000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      tap(recipes => console.log('Fetched recipes:', recipes)),
      catchError(err => {
        console.error('Error fetching recipes', err);
        return of([]);
      })
    );
  }

  getRecipeById(id: string): Observable<Recipe | null> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
      tap(recipe => console.log('Fetched recipe:', recipe)),
      catchError(err => {
        console.error(`Error fetching recipe id=${id}`, err);
        return of(null);
      })
    );
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe).pipe(
      tap(newRecipe => console.log('Created recipe:', newRecipe)),
      catchError(err => {
        console.error('Error creating recipe', err);
        throw err;
      })
    );
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe).pipe(
      tap(updated => console.log('Updated recipe:', updated)),
      catchError(err => {
        console.error(`Error updating recipe id=${id}`, err);
        throw err;
      })
    );
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted recipe id=', id)),
      catchError(err => {
        console.error(`Error deleting recipe id=${id}`, err);
        throw err;
      })
    );
  }
}
