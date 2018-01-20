import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  constructor(private todoService: TodoProvider, public navCtrl: NavController, private alertCtrl: AlertController) {
    this.todos = this.todoService.getTodos();
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos,$event);
  }
  openTodoAlert(){
    let addTodoAlert =this.alertCtrl.create({
      title: "Add a todo",
      message: "Enter your Todo",
      inputs: [
        {
        type: "text",
        name: "addTodoInput"
      }
    ],
      buttons: [
        {
        text: "Cancel"
      },
      {
        text: "Add Todo",
        handler: (inputData)=>{
          this.todoService.addTodo(inputData.addTodoInput);
        }
      }
    ]
    });
    addTodoAlert.present();
  }

}
