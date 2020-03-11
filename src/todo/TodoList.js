import React, { Component } from 'react';

class TodoList extends Component {
    
    constructor(){
        super();
        this.state = {
            userInput : "",
            items: []
        };
    }
    onChange(event){
        this.setState({
            userInput : event.target.value
        }, ()=>{console.log(this.state.userInput)});       
    }
        addTodo(event){
            event.preventDefault();
            if(this.state.userInput !== ""){
                if(this.state.items.includes(this.state.userInput)){
                    alert("Cette tâche a déja été enregistrée");
                }
                else{
                    this.setState({
                        items : [...this.state.items, this.state.userInput],
                        userInput : ""
                    }, ()=>{localStorage.setItem(JSON.stringify("items"), this.state.items)});
                    console.log(localStorage.getItem(JSON.parse("items")));
                    
                }
            }

        }
renderTodos(){
    return this.state.items.map((item)=>{
        return(
            <div className="d-flex justify-content-between list-group-item" key={item}>{item}<button className="btn-danger" onClick={this.delete.bind(this, item)}> X </button></div>
        );
    });
}
delete(item){
    const array = this.state.items;
    console.log(item);
    
    const index = array.indexOf(item);
    console.log(index);

    array.splice(index, 1);
    this.setState({
        items : array
    })
    console.log(array);

}
    render(){
        return (
            <div>
                <h1 className="text-center">Todo list</h1>

                <form className="form-row" onSubmit={this.addTodo.bind(this)} >
                    <input
                        className="form-control mb-2"
                        value={this.state.userInput} 
                        placeholder="Renseignez un item" 
                        type="text"
                        onChange={this.onChange.bind(this)}
                        />
                    <button className="btn-primary">Ajouter</button>
                </form>
                <div className="list-group mt-4">
                    {this.renderTodos()}
                </div>
            </div>
        );
    }
}

export default TodoList;