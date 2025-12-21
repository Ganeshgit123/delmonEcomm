import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: false
})
export class OrderComponent {
  endpoint = environment.baseUrl;
  userId: any;
  orderData: any;
  confirmData: any;
  completeData: any;
  cancelData: any;
  orderId: any;
  acceptValue: any;
  orderBillDetails: any;
  orderDetailsData: any;
  orderCartData: any;
  pipe = new DatePipe('en-US');
  websiteFlow: any;
  adminLogin: any;
  dir: any;
  loadedTabs: { [key: string]: boolean } = {};

  constructor(private auth: AuthService, private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');
    this.userId = sessionStorage.getItem('userId');

    this.loadOrders('PLACED');
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.loadOrders('PLACED');
        break;
      case 1:
        this.loadOrders('CONFIRMED');
        break;
      case 2:
        this.loadOrders('COMPLETED');
        break;
      case 3:
        this.loadOrders('CANCELLED');
        break;
    }
  }

  loadOrders(type: string) {
    if (this.loadedTabs[type]) return; // prevent multiple API calls

    switch (type) {
      case 'PLACED':
        this.auth.getOrder(this.userId).subscribe((res: any) => {
          this.orderData = res.data;
          this.loadedTabs[type] = true;
        });
        break;
      case 'CONFIRMED':
        this.auth.confirmOrder(this.userId).subscribe((res: any) => {
          this.confirmData = res.data;
          this.loadedTabs[type] = true;
        });
        break;
      case 'COMPLETED':
        this.auth.completeOrder(this.userId).subscribe((res: any) => {
          this.completeData = res.data;
          this.loadedTabs[type] = true;
        });
        break;
      case 'CANCELLED':
        this.auth.cancelOrder(this.userId).subscribe((res: any) => {
          this.cancelData = res.data;
          this.loadedTabs[type] = true;
        });
        break;
    }
  }

  date(value: any) {
    let date_string = value;
    let parts_of_date: any = date_string.split("/");

    let output = new Date(+parts_of_date[2], parts_of_date[1] - 1, +parts_of_date[0]);
    return this.pipe.transform(output, 'EEEE, MMM d, y');
  }

  cancelOrder(id: any) {
    var object = { "orderStatus": "USERREJECTED" };
    this.auth.declineOrder(id, object).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success('Success ', res.massage);
        this.dialog.closeAll();
        this.ngOnInit();
      } else {
        this.toastr.error('Enter valid ', res.massage);
      }
    })
  }

  reOrder(id: any) {
    this.auth.reOrderFunc(id).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success('Success ', res.massage);
        this.dialog.closeAll();
        this.ngOnInit();
      } else {
        this.toastr.error('Enter valid ', res.massage);
      }
    })
  }

  orderDetail(content: any, id: any) {
    this.dialog.open(content, { width: '900px' });
    this.orderId = id;
    this.auth.getOrderDetails(this.orderId).subscribe((res: any) => {
      this.orderBillDetails = res.data[0].order;
      this.orderDetailsData = res.data;
      this.orderCartData = res.productDetails;
    })
  }

}
