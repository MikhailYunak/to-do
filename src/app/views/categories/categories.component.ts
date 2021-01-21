import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Output() selectCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<Category>();
  @Output() updateCategory = new EventEmitter<Category>();

  @Input() categories: Category[];
  @Input()selectedCategory: Category;
  indexMouseMove: number;

  constructor(
    private dialog: MatDialog,
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

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(
      EditCategoryDialogComponent,
      {
        data: [category.title, 'Edit category'],
        autoFocus: false,
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }

      if (result as string) {
        category.title = result;

        this.updateCategory.emit(category);
        return;
      }

    });
  }
}
