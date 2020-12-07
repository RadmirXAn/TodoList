class List{

    static link:string = "http://mobile-dev.oblakogroup.ru/candidate/RadmirXAn/";

    static linkData(obj:object):string{
        var data = "?";
        for (const [key, value] of Object.entries(obj)) {
            data += `${key}=${value}&`;
        }
        return data;
    }

    static getLists(callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("GET", List.link+"list", true);
        xhttp.send();
    }

    static createList(callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("POST", List.link+"list", true);
        xhttp.send();
    }

    static editList(id:number, data:object, callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log( this.readyState, this.status );
        //Status 204 - No Content : Хотя данные добавляются =)
          if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
            callback(this.responseText);
          }
        };
        console.log( List.link+"list/"+id+this.linkData(data) );
        xhttp.open("PATCH", List.link+"list/"+id+this.linkData(data), true);
        xhttp.send();
    }

    static removeList(id:number, callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("DELETE", List.link+"list/"+id, true);
        xhttp.send();
    }

    static createTodo(listId:number, callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("POST", List.link+"list/"+listId+"/todo", true);
        xhttp.send();
    }   

    static editTodo(listId:number, todoId:number, data:object, callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log( this.readyState, this.status );
          if (this.readyState == 4 && this.status == 200 ) {
            callback(this.responseText);
          }
        };
        console.log( "" );
        xhttp.open("PATCH", List.link+"list/"+listId+"/todo/"+todoId+this.linkData(data), true);
        xhttp.send();
    }

    static removeTodo(listId:number, todoId:number, callback:Function){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("DELETE", List.link+"list/"+listId+"/todo/"+todoId, true);
        xhttp.send();
    }

}

export default List;