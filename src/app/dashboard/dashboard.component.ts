import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import { Product } from '../model/product';
import {AlertService} from '../shared/alert.service';


/**
 * @title Injecting data when opening a dialog
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _listFilter: string = '';
  p:number = 1;
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: Product[] = [];

  productList: any;
  constructor(public dialog: MatDialog,private api:ApiService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productList.filter((product: Product) =>
      product.name.toLocaleLowerCase().includes(filterBy));
  }

  key:string = 'id';
  reverse:boolean = false;
  sort(key){
      this.key=key;
      this.reverse=!this.reverse;
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
      //this.alertService.showNotification('Product list loaded successfully. Yay :)','OK','success');
      this.productList = res;
      this.listFilter = '';
      if(this.productList.length == 0){
        this.alertService.showNotification('Oops! No data is present for now :(','OK','nothing');
      }
      
    },
    err => {
      this.alertService.showNotification('There was an error in receiving data from server! Please try again.','OK','error');
    })
  }

  deleteDetails(data:any){
    this.api.deleteProduct(data.id)
    .subscribe(res => {
      this.alertService.showNotification('Product deleted successfully. Yay :)','OK','success');
      this.getProductDetails();
    },
    err => {
      this.alertService.showNotification('There was an error in deleting data! Please try again.','OK','error');
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
        this.getProductDetails();
      }
    });
  }

}
 
  //Dialog Component opened 
  @Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: './dialog-data-example-dialog.html',
  })
  export class DialogDataExampleDialog implements OnInit {
    title:any;
    formValue !: FormGroup;
    productObj : Product = new Product();
    isAdd: boolean;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data,public dialogRef:MatDialogRef<DialogDataExampleDialog>,private formBuilder:FormBuilder, private api:ApiService,private alertService: AlertService) {}
    
    ngOnInit():void{
      this.formValue= this.formBuilder.group({
        name:['',[Validators.required]],
        price:['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        description:['',[Validators.minLength(20), Validators.maxLength(100)]],
        photo:[''],
        //fileSource:[''],
        category:['',[Validators.required]]
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
          this.alertService.showNotification('New Product has been added successfully. Yay :)','OK','success');
           this.formValue.reset();
           this.dialogRef.close({event:'refresh'});
         },
         err => {
          this.alertService.showNotification('There was an error in adding data to server! Please try again.','OK','error');
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
          this.alertService.showNotification('Product has been updated successfully. Yay :)','OK','success');
          this.dialogRef.close({event:'refresh'});
        },
          err => {
            this.alertService.showNotification('There was an error in updating data to server! Please try again.','OK','error');
          })
    }

    close(){
      this.dialogRef.close();
    }

    /*onFileChange(event){
      if(event.target.files.length > 0){
        const file = event.target.files[0];
        this.formValue.patchValue({
          fileSource:file
        })
      }  
    }*/
    
  }

  





