// standard method CRUD (create, read, update, delete);

import {Observable} from 'rxjs';

// all method return Observable - for async work in reactive style;
export interface CommonDAO<T> {

  // get all value;
  getAll(): Observable<T[]>;

  // get value by id;
  get(id: number): Observable<T>;

  // update value
  update(t): Observable<T>;

  // delete value
  delete(id: number): Observable<T>;

  // add Value
  add(t): Observable<T>;

}
