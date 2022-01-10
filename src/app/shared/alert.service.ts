import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertComponent } from '../common/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage:any,buttonText:any,messageType:any){
    this.snackBar.openFromComponent(AlertComponent, {
      data:{
        message:displayMessage,
        buttonText:buttonText,
        messageType:messageType
      },
      duration:6000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:messageType
    })
  }
}
