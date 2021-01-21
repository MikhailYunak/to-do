import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';

const COMPLETED_COLOR = '#F8F9FA';

const WHITE_COLOR = '#FFFFFF';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() selectCategory = new EventEmitter<Category>();
  @Output() filterByTitle = new EventEmitter<string>();
  @Output() filterByStatus = new EventEmitter<boolean>();
  @Output() filterByPriority = new EventEmitter<Priority>();

  tasks: Task[];
  priorities: Priority[];
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  pagesNumber = [10, 20, 50, 100];
  searchTaskText: string;
  selectedStatusFilter: boolean = null;
  selectedPriorityFilter: Priority = null;

  @Input() set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input()
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(
      EditTaskDialogComponent,
      {data: [task, 'Edit task'], autoFocus: false}
      );
    dialogRef.afterClosed().subscribe(result => {

      switch (result) {
        case 'completed' : {
         task.completed = true;
         this.updateTask.emit(task);
         return;
       }
        case 'activate' : {
          task.completed = false;
          this.updateTask.emit(task);
          return;
        }
        case 'delete' : {
          this.deleteTask.emit(task);
          return;
        }
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm Action',
        message: `Are you sure you want to delete the task: "${task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  showTaskByCategory(category: Category): void {
    this.selectCategory.emit(category);
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  getPriorityColor(task: Task): string {

    // цвет завершенной задачи
    if (task.completed) {
      return COMPLETED_COLOR;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return WHITE_COLOR;

  }

  // onSelectCategory(category: Category): void {
  //   this.selectCategory.emit(category);
  // }

  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean): void {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  private fillTable() {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'priority' : {
          return task.priority ? task.priority.id : null;
        }
        case 'category' : {
          return task.category ? task.category.title : null;
        }
        case 'date' : {
          return task.date ? task.date.toString() : null;
        }
        case 'title' : {
          return task.title;
        }
      }
    };

  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
