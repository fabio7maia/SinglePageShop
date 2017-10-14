import { Pipe, PipeTransform } from '@angular/core';

type Args = 'keyval'|'key'|'value';

@Pipe({
  name: 'mapToIterable',
  pure: false
})
export class MapToIterablePipe implements PipeTransform {
  transform(obj: Map<string, Object>, arg: Args = 'keyval'): Array<Object> {
    let returnArray: Array<Object> = new Array<Object>();

    obj.forEach((value, key) => {
        if (arg === 'keyval'){
          returnArray.push({value: value, key: key});
        }else if (arg == 'key'){
          returnArray.push(key);
        }else if (arg == 'value'){
          returnArray.push(value);  
        }
    });

    //console.log(arg, obj, returnArray);
    return returnArray;
  }
}