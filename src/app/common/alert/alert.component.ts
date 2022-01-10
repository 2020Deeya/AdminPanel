import { Component, OnInit , Inject, Injector} from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any,public snackBarRef:MatSnackBarRef<AlertComponent>) { }

  ngOnInit(): void {
  }

}
