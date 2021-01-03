import {CommonDAO} from './common-dao';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';


export interface PriorityDAO extends CommonDAO<Priority> {

  change(title: string): Observable<Priority>;
}
