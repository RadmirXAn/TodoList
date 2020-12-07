import { plainToClass } from 'class-transformer';

import Todo from './todo/Todo';

class List{
    id:number = 0;
    _title:string = "";

    get title():string{
        return this._title;
    }

    set title(value:string){
        this._title = value || "Безымянный список";
    }

    candidate_id:number = 0;

    _todos:Todo[] = [];

    get todos():Todo[]{
        return this._todos;
    }

    set todos(value:Object[]){
        this._todos = []
        for(var i:number=0; i<value.length;i++){
            this._todos.push( plainToClass(Todo, value[i]) );
        }
    }

    getTodoCount():number{
        return this._todos.length;
    }
    
    getTodo(index:number):Todo{
        return plainToClass(Todo, this._todos[index]);
    }

    static getLists(jsonText:string):List[]{
        let data:Object[] = JSON.parse(jsonText);
        var arr:List[] = [];
        for(var i=0; i<data.length; i++){
            arr.push( plainToClass( List, data[i] ) );
        }
        return arr;
    }

}

export default List;