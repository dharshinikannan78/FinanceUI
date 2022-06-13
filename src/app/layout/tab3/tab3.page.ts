import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, WorkStations } from 'src/app/entities/topglove.domain.model';
import { saveAs } from 'file-saver';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Size, TypeOfFormers } from '../../entities/topglove.domain.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {



  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService,
    private router: Router,
    public fb: FormBuilder,
    public notificationService: NotificationService
  ) {
    this.generateLoginForm();


  }
  _data: any;
  attachmentId: any;
  form: any;

  ngOnInit(): void {
    console.log('geetha')
    this.apiService.getCustomerDetails().subscribe(data => {
      this._data = data;
      console.log(this._data, 'geetha');
    })
  }



  loginForm: FormGroup

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      customerName: ['', Validators.required],
      // guarantorName: ['',],
      // address: ['', ],
      // mobileNumber: ['', ],
      // aadharNumber: ['', ],
      // referredBy: ['', ],
      // attachmentId: [''],
      // createdBy: ['', ],
      // dateOfCreated: [moment().format()],
      // modifiedBy: ['', ],
      // dateOfModified: [moment().format()]
    });
  }

  thisFormValid() {
    if (this.loginForm.valid) {
      return true
    } else {
      return false
    }
  }
  save() {
    this.apiService.insertCustomer(this.loginForm.value).subscribe(data => {
      console.log(data.productId, 'productId')
      console.log(data, ' data');
      this.loginForm.reset();
      this.notificationService.success('Customer details saved successfully')
      // this.router.navigate(['/tabs/tab2']);
    });

  }
  validateNumber(e) {
    const keyCode = e.keyCode;
    if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
      e.preventDefault();
    }
  }

  uploadcandidateFile = (fileChangeEvent: any) => {
    console.log(fileChangeEvent, 'geetha')
    const photo = fileChangeEvent.target.files[0];
    console.log(photo, 'geetha')

    const formData = new FormData();
    console.log(formData, 'geetha')

    formData.append('file', photo);
    this.apiService.fileUpload(formData).subscribe((file: any) => {
      this.attachmentId.push(file.attachmentId);


      console.log(file, 'file')
      console.log(this.attachmentId, 'this.attachmentId')
      file.attachmentName;
      file.attachmentPath;
      console.log(file.attachmentId, 'file.attachmentId')
      console.log(file.attachmentName, 'this.attachmentId')
      console.log(file.attachmentPath, 'this.attachmentId')
    });

  }
}
