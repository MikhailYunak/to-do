import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'to-do';
  tasks: Task[];
  categories: Category[];
  private selectedCategory: Category = null;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(task => this.tasks = task);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
      .subscribe(tasks => this.tasks = tasks);
  }

  onUpdateTask(task: Task) {
    forkJoin({
      requestOne: this.dataHandler.updateTask(task),
      requestTwo: this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
    }).subscribe(({requestOne, requestTwo}) => {
      this.tasks = requestTwo;
    });
  }

  onDeleteTask(task: Task) {
    forkJoin({
      requestOne: this.dataHandler.deleteTask(task.id),
      requestTwo: this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
    }).subscribe(({requestOne, requestTwo}) => {
      this.tasks = requestTwo;
    });
  }
}
