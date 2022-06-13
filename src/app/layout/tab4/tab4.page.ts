import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {


  ProductIdValue: any;

  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    private router: Router,
    public userService: UserService,
    public fb: FormBuilder,
    public notificationService: NotificationService
  ) {
    this.generateLoginForm();

  }
  productId = "1";
  productForm: FormGroup;
  gotid: any;

  generateLoginForm = () => {
    this.productForm = this.fb.group({
      //productId:[''],
      productName: ['', Validators.required],
      // productType: ['', Validators.required],
      // productTenure: ['', Validators.required],
      // numberOfCustomers: ['', Validators.required],
      // productDescription: ['', Validators.required],
      // createdBy: ['', Validators.required],
      // dateOfCreated: [moment().format()],
      // modifiedBy: ['', Validators.required],
      // dateOfModified: [moment().format()]
      //isActive: [null]

    });


  }

  thisFormValid() {
    if (this.productForm.valid) {
      return true
    } else {
      return false
    }
  }
  addProduct() {
    this.apiService.insertProduct(this.productForm.value).subscribe(data => {
      console.log(data.productId, 'productId')
      console.log(data, ' data');
      console.log(data.productId, ' data.productId ');
      this.productForm.reset();
      this.notificationService.success('Product details saved successfully');
       this.router.navigate(['/tabs/tab1'])
    });
  }
}
