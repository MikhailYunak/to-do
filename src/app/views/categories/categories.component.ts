import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() selectCategory = new EventEmitter<Category>();
  @Input() categories: Category[];

  selectedCategory: Category;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  showTaskByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }
}
