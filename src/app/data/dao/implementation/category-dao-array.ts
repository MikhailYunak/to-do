import {CategoryDAO} from '../interface/category-dao';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDaoArray implements CategoryDAO {
  add(t): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {

    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const catTmp = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(catTmp), 1);

    return of(catTmp);
  }

  get(id: number): Observable<Category> {
    return of(TestData.categories.find(category => category.id === id));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(category: Category): Observable<Category> {

    const catTmp = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(catTmp), 1, category);

    return of(category);
  }

}
