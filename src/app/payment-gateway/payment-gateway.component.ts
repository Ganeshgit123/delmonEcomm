import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})

export class PaymentGatewayComponent implements OnInit {
  orderId = 'ORDER123'; // Generate dynamically
  totalAmount = '100.00'; // Get from cart
  sessionId = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post<any>('/api/payment/session', {
      amount: this.totalAmount,
      orderId: this.orderId
    }).subscribe(res => {
      this.sessionId = res.sessionId;
    });
  }
}