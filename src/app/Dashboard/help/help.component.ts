import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css'],
    standalone: false
})
export class HelpComponent {

  selectedValue :any;
  whatsAppNumber : any;
  countryCode: any;
  email: any;
  call: any;
  websiteFlow: any;

  constructor(private auth: AuthService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.settingsUrl().subscribe((res:any) => {
      this.call = res.data.call;
      this.whatsAppNumber = res.data.whatsAppNumber;
      this.email = res.data.email;
      this.countryCode = res.data.countryCode;
    })

  }

  sendHelpType(value:any){
    this.selectedValue = value;    
  } 
}
