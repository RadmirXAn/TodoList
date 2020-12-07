
class Todo{
    id:number = 0;

    _text:string = "";

    get text():string{
        return this._text;
    }

    set text(value:string){
        this._text = value || "Безымянная задача";
    }

    list_id:number = 0;
    checked:boolean = false;
}

export default Todo;