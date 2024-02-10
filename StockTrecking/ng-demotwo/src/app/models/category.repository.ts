import { Category } from "./category";

export class CategoryRepository{
    private categories : Category[] = [
        {id:1 , name:"Kumaş"},
        {id:2 , name:"Elbise"},
        {id:3 , name:"Pantolon"},
    ];

    getCategories():Category[]{
        return this.categories
    }

    getCategoryById(id:number){
        return this.categories.find( c => c.id == id)
    }
}