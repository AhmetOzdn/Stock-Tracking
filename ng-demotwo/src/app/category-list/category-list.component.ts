import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  selectedCategory:Category | null;
  categories:Category[];
  categoryRepository:CategoryRepository;

  constructor(){
    this.categoryRepository = new CategoryRepository();
    this.categories = this.categoryRepository.getCategories();
    
  }

  //active classını ekleme 
  displayAll = true;

  selectCategory(category?:Category){
    if(category){
      this.displayAll = false;
      this.selectedCategory = category;
    }else{
      this.displayAll= true
      this.selectedCategory = null;
    }
    }

}
