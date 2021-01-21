import {TaskDAO} from '../interface/task-dao';
import {Observable, of} from 'rxjs';
import { Task } from 'src/app/model/Task';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';

export class TaskDaoArray implements TaskDAO {
  add(t): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    return of(taskTmp);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let listOfTasks = TestData.tasks;

    if (category !== null && category !== undefined) {
      listOfTasks = listOfTasks.filter(task => task.category === category);
    }

    if (searchText !== null && searchText !== undefined) {
      listOfTasks = listOfTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase()));
    }

    if (status !== null && status !== undefined) {
      listOfTasks = listOfTasks.filter(task => task.completed === status);
    }

    if (priority !== null && priority !== undefined) {
      listOfTasks = listOfTasks.filter(task => task.priority === priority);
    }

    return listOfTasks;

  }
}
