import {CategoryDAO} from '../interface/category-dao';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDaoArray implements CategoryDAO {
  add(t): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
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

  update(t): Observable<Category> {
    return undefined;
  }

}
