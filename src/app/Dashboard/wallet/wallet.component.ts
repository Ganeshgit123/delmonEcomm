import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  standalone: false
})
export class WalletComponent {

  amount: any;
  userId: any;
  orderId: any = 10;
  type: any = 'ADD';
  paymentType = 'CARD';
  walletData: any;
  getWalletDetails: any;
  walletAmount: any;
  websiteFlow: any;
  adminLogin: any;
  dir: any;
  dialogRef: MatDialogRef<any> | null = null;

  constructor(private auth: AuthService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.websiteFlow = localStorage.getItem('flow');
    this.userId = sessionStorage.getItem('userId');
    this.adminLogin = sessionStorage.getItem('adminLogin');

    this.auth.get_Wallet(this.userId).subscribe((res: any) => {
      this.getWalletDetails = res.data;
      this.walletAmount = res.walletAmount;
      // console.log(this.getWalletDetails);

    })
  }

  btnAmount(price: any) {
    this.amount = price;
  }

  add_Wallet() {

    this.walletData = { "paymentType": this.paymentType, "orderId": this.orderId, "type": this.type, "amount": this.amount };
    this.auth.add_Wallet(this.walletData, this.userId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.ngOnInit();
      this.closeDialog();
    })

  }

  openVerticallyCentered(content: any) {
    this.dialogRef = this.dialog.open(content, {});
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    } else {
      this.dialog.closeAll();
    }
  }



}

