import { ArchivedTodosPage } from './../archived-todos/archived-todos';
import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  constructor(private todoService: TodoProvider, public navCtrl: NavController,
     private alertCtrl: AlertController, private toastCtrl:ToastController) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
   this.todoService.archiveTodo(todoIndex);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
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
          addTodoAlert.onDidDismiss(()=>{
            this.createToad("Todo Added");
          });
          
        }
      }
    ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex){
    let editTodoAlert =this.alertCtrl.create({
      title: "Edit a todo",
      message: "Edit your Todo",
      inputs: [
        {
        type: "text",
        name: "editTodoInput",
        value: this.todos[todoIndex]
      }
    ],
      buttons: [
        {
        text: "Cancel"
      },
      {
        text: "Edit Todo",
        handler: (inputData)=>{
          this.todoService.editTodo(inputData.editTodoInput,todoIndex);
          editTodoAlert.onDidDismiss(()=>{
            this.createToad("Todo Edited");
          });
          
        }
      }
    ]
    });
    editTodoAlert.present();
  }

  createToad(msg:string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2100
    });
    toast.present();
  }
}
