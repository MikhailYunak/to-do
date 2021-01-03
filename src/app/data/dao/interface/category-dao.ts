import {CommonDAO} from './common-dao';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

export interface CategoryDAO  extends CommonDAO<Category> {

  // search category by title
  search(title: string): Observable<Category[]>;

}
