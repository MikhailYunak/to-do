import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {forkJoin} from 'rxjs';
import {Priority} from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'to-do';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category = null;
  statusFilter: boolean;
  searchTaskText: string;
  priorityFilter: Priority;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(task => this.tasks = task);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.updateTask();
  }

  onUpdateTask(event) {
    this.updateTask();
  }

  onDeleteTask(task: Task) {
    forkJoin({
      requestOne: this.dataHandler.deleteTask(task.id),
      requestTwo: this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
    }).subscribe(({requestOne, requestTwo}) => {
      this.tasks = requestTwo;
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTask();
  }

  onSearchTasks(searchText: string) {
    this.searchTaskText = searchText;
    this.updateTask();
  }

  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTask();
  }

  private updateTask(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => this.tasks = tasks);
  }
}
