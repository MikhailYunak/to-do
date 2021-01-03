import {PriorityDAO} from '../interface/priority-dao';
import {Observable, of} from 'rxjs';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';

export class PriorityDaoArray implements PriorityDAO{
  add(t): Observable<Priority> {
    return undefined;
  }

  change(title: string): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(t): Observable<Priority> {
    return undefined;
  }
}
