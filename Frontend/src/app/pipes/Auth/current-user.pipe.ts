import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'currentUser'
})
export class CurrentUserPipe implements PipeTransform {

  transform(value: Observable<firebase.default.User | null>) {

    return value.pipe(
      map(v=>{
        if(v){
          return {
            data : v,
            exists : true
          }
        } 
        return {
          data:null,
          exists:false
        }
      })
    );
  }

}
