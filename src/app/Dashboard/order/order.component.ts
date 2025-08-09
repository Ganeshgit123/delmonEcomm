import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  endpoint = environment.baseUrl;

  constructor(private auth: AuthService, private modalService: NgbModal,
    private toastr: ToastrService,) { }

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

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "rtl";
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');
    this.userId = sessionStorage.getItem('userId');

    this.auth.getOrder(this.userId).subscribe((res: any) => {
      this.orderData = res.data;
    });

    this.auth.confirmOrder(this.userId).subscribe((res: any) => {
      this.confirmData = res.data;
    });

    this.auth.completeOrder(this.userId).subscribe((res: any) => {
      this.completeData = res.data;
    });

    this.auth.cancelOrder(this.userId).subscribe((res: any) => {
      this.cancelData = res.data;
    });
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
      if (res.success == true) {
        this.toastr.success('Success ', res.massage);
        this.modalService.dismissAll();
        this.ngOnInit();
      } else {
        this.toastr.error('Enter valid ', res.massage);
      }
    })
  }

  reOrder(id: any) {
    this.auth.reOrderFunc(id).subscribe((res: any) => {
      if (res.success == true) {
        this.toastr.success('Success ', res.massage);
        this.modalService.dismissAll();
        this.ngOnInit();
      } else {
        this.toastr.error('Enter valid ', res.massage);
      }
    })
  }

  orderDetail(content: any, id: any) {
    this.modalService.open(content, { size: 'lg' });
    this.orderId = id;
    this.auth.getOrderDetails(this.orderId).subscribe((res: any) => {
      this.orderBillDetails = res.data[0].order;
      this.orderDetailsData = res.data;
      this.orderCartData = res.productDetails;
    })
  }

}
