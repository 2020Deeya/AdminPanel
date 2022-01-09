import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import { Product } from '../model/product';


/**
 * @title Injecting data when opening a dialog
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productList: any;
  constructor(public dialog: MatDialog,private api:ApiService) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {},
      //disableClose:true,
      width:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined && result.event==='refresh'){
        this.getProductDetails();
      }
    });
  }

  getProductDetails(){
    this.api.getProduct()
    .subscribe(res => {
      console.log("Fetched");
      this.productList = res;
    },
    err => {
      console.log("Error");
    })
  }

  deleteDetails(data:any){
    this.api.deleteProduct(data.id)
    .subscribe(res => {
      console.log("Deleted");
      this.getProductDetails();
    },
    err => {
      console.log("Error");
    })
  }

  updateDetails(data:any){
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: data,
      //disableClose:true,
      width:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined && result.event==='refresh'){
        console.log("Refreshed");
        this.getProductDetails();
      }
    });
  }

}
 
  @Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: './dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog implements OnInit {
    title:any;
    formValue !: FormGroup;
    productObj : Product = new Product();
    isAdd: boolean;
    fromDialog: any = "refresh";
    constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef:MatDialogRef<DialogDataExampleDialog>,private formBuilder:FormBuilder, private api:ApiService) {}
    
    ngOnInit():void{
      this.formValue= this.formBuilder.group({
        name:[''],
        price:[''],
        description:[''],
        photo:[''],
        category:['']
      })
      //update or add
      if(Object.keys(this.data).length===0){
        this.title= "Add";
        this.isAdd = true;  
      }else{
        this.title= "Update"
        this.formValue.controls['name'].setValue(this.data.name);
        this.formValue.controls['price'].setValue(this.data.price);
        this.formValue.controls['description'].setValue(this.data.description);
        this.formValue.controls['photo'].setValue(this.data.photo);
        this.formValue.controls['category'].setValue(this.data.category);
      }
      
    }

    postProductDetails(){
      this.productObj.name = this.formValue.value.name;
      this.productObj.description = this.formValue.value.description;
      this.productObj.price = this.formValue.value.price;
      this.productObj.photo = this.formValue.value.photo;
      this.productObj.category = this.formValue.value.category;

      this.api.postProduct(this.productObj)
         .subscribe(res => {
           console.log("Added");
           this.formValue.reset();
           this.dialogRef.close({event:'refresh',data:this.fromDialog});
         },
         err => {
           console.log("Error");
         })
    }
    

    updateDetailsForm() {
      this.productObj.id = this.data.id;
      this.productObj.name = this.formValue.value.name;
      this.productObj.description = this.formValue.value.description;
      this.productObj.price = this.formValue.value.price;
      this.productObj.photo = this.formValue.value.photo;
      this.productObj.category = this.formValue.value.category;
      this.api.updateProduct(this.productObj, this.productObj.id)
        .subscribe(res => {
          console.log("Updated");
          this.dialogRef.close({event:'refresh',data:this.fromDialog});
        },
          err => {
            console.log("Error");
          })
    }

    close(){
      this.dialogRef.close();
    }
    
  }

  





