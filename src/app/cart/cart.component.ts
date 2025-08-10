import { Component, NgZone } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
declare const google: any;

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CartComponent {
  productDetails: any;
  quantity: number = 1;
  cartSubTotal: any = 0.0;
  activeButton: any;
  addressForm: any;
  submitted = false;
  cartLength: any;
  addData: any;
  addLength: any;
  saveButton: any;
  typeButton: any = 0;
  addSelected: any;
  pincodeData: any;
  loyaltyPoint: any;
  totalAmount: any = 0.0;
  i = 1;
  pickupAddress: any;
  viewData: any;
  address: any;
  paymentType: any;
  userId: any;
  deliveryDAte: any;
  minDate!: Date;
  maxDate!: Date;
  couponForm!: FormGroup;
  notesForm!: FormGroup;
  //date = new FormControl(new Date());
  options: AnimationOptions = {
    path: 'assets/images/Animations/Chicken-Roll.json'
  };
  fistData: any;
  VATSum: any;
  couponResponse: any;
  prodTotal: any;
  couponVal: any;
  order: any = [];
  addressList: any = [];
  selectedPin: any;
  deliveryCharge: any;
  deliveryType: any;
  delivAddresChange: any;
  deliverAddressArray: any = [];
  isEdit = false;
  addressId: any;
  getAddress: any;
  loyaltyPointDiscount: any;
  isAppliedLoyaltyPoint: boolean = false;
  IsSubmitButtonEnable: boolean = true;
  couponAmount: any;
  websiteFlow: any;
  loginType: any;
  canCalendarShowForDelivery: string = "false";
  date: any;
  totalEmployeeDiscount: any;
  isappliedEmployeeDiscount: boolean = false;
  isHoliday: boolean = false;
  isAppliedCoupon: boolean = false;
  maxCartonDiscountPerDay: any;
  couObj: any;
  productDetailsObject: any = [];
  deliveryChargeObject: any;
  couponResponseObject: any;
  loyaltyPointsObject: any;
  vatObject: any;
  isLoyaltyApplied: boolean = false;// To disable Coupon button when coupon applied
  isCouponApplied: boolean = false; // To disable Loyalty button when loyalty applied
  dir: any;
  zoneData: any;
  areaList: any;
  adminLogin: any;
  currentCartonDiscountEmployee: any = 0;
  isMapSaveButtonEnabled: boolean = true;
  map: any;
  marker: any;
  selectedLat: any;
  selectedLng: any;
  selectedArea: any;

  constructor(private auth: AuthService, private builder: FormBuilder, private toastr: ToastrService,
    private modalService: NgbModal, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.adminLogin = sessionStorage.getItem('adminLogin');
    this.websiteFlow = localStorage.getItem('flow');
    this.loginType = sessionStorage.getItem('userType');
    this.deliveryType = sessionStorage.getItem('deliverrType');
    this.deliveryCharge = sessionStorage.getItem('deliveryCharg');
    this.delivAddresChange = sessionStorage.getItem('delivAddChange');

    this.auth.getZones().subscribe((res: any) => {
      this.zoneData = res.data;
    });

    if (this.delivAddresChange == 'true') {
      this.fistData = JSON.parse(sessionStorage.getItem('deliveryFullAddress') || "null");
      this.deliverAddressArray = this.fistData;
    }
    this.auth.viewCart().subscribe((res: any) => {
      this.viewData = res;
      this.productDetails = res.data;
      // console.log("Fef", this.productDetails)
      this.userId = sessionStorage.getItem('userId');
      this.cartLength = this.productDetails.length;
      this.pickupAddress = res.address?.address;
      if (res.isSelfPickup == 1) {
        this.sendDeliveryType('PICKUP');
        sessionStorage.setItem('deliverrType', 'PICKUP');
        sessionStorage.setItem('deliveryFullAddress', this.pickupAddress);
      } else if (res.isDelivery == 1) {
        this.sendDeliveryType('DELIVERY');
        sessionStorage.setItem('deliverrType', 'DELIVERY');
      } else if (res.isDelivery == 1 && res.isSelfPickup == 1) {
        this.sendDeliveryType('PICKUP');
        sessionStorage.setItem('deliverrType', 'PICKUP');
        sessionStorage.setItem('deliveryFullAddress', this.pickupAddress);
      } else {
        this.sendDeliveryType(this.deliveryType);
        sessionStorage.setItem('deliverrType', 'PICKUP');
        sessionStorage.setItem('deliveryFullAddress', this.pickupAddress);
      }
      this.loyaltyPoint = res.loyaltyPoint;
      //this.loyaltyPointDiscount = res.loyaltyPointDiscount;
      this.canCalendarShowForDelivery = this.viewData.canCalendarShowForDelivery;
      this.maxCartonDiscountPerDay = this.viewData.maxCartonDiscountPerDay;
      this.checkHolidayaListForDelivery();
      this.productDetailsObject = [];
      this.productDetails.forEach((element: any) => {
        var price = element.quantity * element.price
        var item = {
          title: element.name,
          price: price.toFixed(2) + " BD",
        }
        this.productDetailsObject.push(item);
      });

      if (!(this.deliveryCharge == '' || this.deliveryCharge == null)) {
        this.deliveryChargeObject = {
          title: 'Delivery fee',
          price: this.deliveryCharge + " BD"
        }
      }

      let totSum = 0;
      this.productDetails.forEach((element: any) => {
        const prodTot = element.quantity * element.price
        this.prodTotal = totSum += prodTot;
      })

      this.couponResponse = JSON.parse(sessionStorage.getItem('Coupon') || "null");
      if (this.couponResponse != null || this.couponResponse != undefined) {
        this.isCouponApplied = true;
        this.isAppliedCoupon = true;
      }
      else {
        this.isCouponApplied = false;
        this.isAppliedCoupon = false;
      }
      var couponDisc = this.prodTotal * (this.couponResponse?.discountPercentage / 100);

      if (couponDisc < this.couponResponse?.maximumDiscount) {
        this.couponAmount = (couponDisc)?.toFixed(2)
      } else {
        this.couponAmount = (this.couponResponse?.maximumDiscount)?.toFixed(2);
      }

      if (this.couponResponse) {
        this.couponResponseObject = {
          title: this.couponResponse?.couponCode,
          price: "-" + this.couponAmount + " BD"
        }
      }

      if (this.isAppliedLoyaltyPoint) {
        this.loyaltyPointsObject = {
          title: 'Loyalty amount',
          price: this.loyaltyPointDiscount + " BD"
        }
      }

      var vatIncludeAray = this.productDetails.filter((element: any) => {
        return element.vat != 0;
      });
      if (vatIncludeAray.length != 0) {
        let sum = 0;
        vatIncludeAray.forEach((element: any) => {
          var vatCalc = (element.quantity * element.price) * (element.vat / 100)
          this.VATSum = sum += vatCalc;
        });
      } else {
        this.VATSum = 0;
      }

      this.vatObject = {
        title: 'VAT',
        price: this.VATSum?.toFixed(2) + " BD"
      }

      // console.log("rer", this.order)
      this.calculateTotal();

    })

    this.auth.getPincode().subscribe((res: any) => {
      this.pincodeData = res.data;
    });
    this.auth.getAddress().subscribe((res: any) => {
      this.getAddress = res.data;
      this.addLength = this.getAddress.length;
      if (this.delivAddresChange == 'true') {
        this.fistData = JSON.parse(sessionStorage.getItem('deliveryFullAddress') || "null");
        this.deliverAddressArray = this.fistData;
      }
      else {
        this.fistData = res.data[0];
        sessionStorage.setItem('deliveryFullAddress', JSON.stringify(this.fistData));
        this.deliverAddressArray = this.fistData;
      }
      this.checkEnableDisableOrderButton();
    });

    this.addressForm = this.builder.group({
      zoneId: ["", [Validators.required]],
      area: ["", [Validators.required]],
      blockNo: ["", [Validators.required]],
      houseNo: ["", [Validators.required]],
      roadNo: ["", [Validators.required]],
      pin: [""],
      flat: [""],
      notes: [""],
      saveAs: ["", [Validators.required]],
    });

    this.couponForm = this.builder.group({
      couponCode: ['', [Validators.required]]
    });

    this.notesForm = this.builder.group({
      notesText: ['', [Validators.required]]
    });

  }

  get f() { return this.addressForm.controls; }

  onZoneChange(value: any) {
    this.auth.getArea(value).subscribe(
      (res: any) => {
        this.areaList = res.data;
      });
  }

  openMap(mapModel: any) {
    this.isMapSaveButtonEnabled = true;
    this.modalService.open(mapModel, { centered: false, backdrop: 'static', keyboard: false, windowClass: 'custom-class' });

    this.loadGoogleMaps().then(() => {
      setTimeout(() => {
        const mapDiv = document.getElementById('map');
        if (mapDiv && mapDiv.offsetParent !== null) {
          this.initMap();
        } else {
          // Retry if container not visible yet
          setTimeout(() => this.initMap(), 300);
        }
      }, 300); // Ensure container is rendered
    });
  }

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve();
        return;
      }

      const scriptId = 'google-maps-script';
      if (document.getElementById(scriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCglNATKhgzk-0FNfN86RUwBhPiqJHOClM&libraries=places&loading=async';
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = (err) => reject(err);

      document.body.appendChild(script);
    });
  }

  initMap(): void {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) {
      console.error("Map div not found!");
      return;
    }
    this.selectedLat = null;
    this.selectedLng = null;
    this.selectedArea = null;
    this.map = new google.maps.Map(mapDiv, {
      center: { lat: 26.0667, lng: 50.5577 },
      zoom: 10
    });

    if (this.map) {
      google.maps.event.addListener(this.map, 'click', (event: any) => {
        if (this.marker && this.marker.setMap) {
          this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({ position: event.latLng, map: this.map });

        this.ngZone.run(() => {
          this.selectedLat = this.marker.position.lat();
          this.selectedLng = this.marker.position.lng();
          this.isMapSaveButtonEnabled = false;  // <-- update inside Angular zone
        });
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(this.selectedLat, this.selectedLng);

        geocoder.geocode({ 'latLng': latlng }, (results: any, status: any) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              this.selectedArea = results[1].formatted_address;
              // console.log(results[1].formatted_address);
            } else {
              // console.log('Location not found');
            }
          } else {
            // console.log('Geocoder failed due to: ' + status);
          }
        });

      });
    }
  }

  closeMap() {
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService.dismissAll();
    this.addressForm.reset();
    this.isEdit = false;
    this.submitted = false;
    this.modalService.open(content, { centered: false, backdrop: 'static', keyboard: false, windowClass: 'custom-class' });
  }

  checkHolidayaListForDelivery() {
    this.isHoliday = false;
    const today = new Date();
    this.deliveryDAte = this.viewData.adminDate;
    this.date = new FormControl(this.deliveryDAte);
    this.minDate = this.viewData.adminDate;
    this.maxDate = new Date(today.setDate(today.getDate() + Number(this.viewData.maxDeliveryDateCanChoose)));
    this.viewData.holidayList.forEach((element: any) => {
      var date = formatDate(this.deliveryDAte, 'dd/MM/yyyy', 'en-US');
      if (element === date) {
        this.isHoliday = true;
      }
    });
  }

  sendSaveAs(data: any) {
    this.addressForm.value.saveAs = data;
    this.saveButton = data;
  }

  sendDeliveryType(data: any) {
    this.typeButton = data;
    if (this.typeButton == 'PICKUP') {
      this.deliverAddressArray = [];
      sessionStorage.setItem('deliverrType', 'PICKUP');
      this.deliveryType = "PICKUP";
      sessionStorage.setItem('deliveryCharg', '');
      sessionStorage.setItem('delivAddChange', 'false')
      sessionStorage.setItem('deliveryFullAddress', this.pickupAddress)
      this.deliverAddressArray.push(this.pickupAddress)
      if (this.deliveryCharge > 0) {
        this.totalAmount = (parseFloat(this.totalAmount) - parseFloat(this.deliveryCharge)).toFixed(2);
      }
      this.deliveryCharge = 0;
    } else {
      sessionStorage.setItem('deliverrType', 'DELIVERY');
      this.deliveryType = "DELIVERY";
      this.auth.getAddress().subscribe((res: any) => {
        this.deliverAddressArray = [];
        this.addData = res.data;
        this.deliverAddressArray.push(this.fistData)
        this.deliveryCharge = this.fistData?.deliveryCharge.toFixed(2);
        sessionStorage.setItem('deliveryCharg', this.deliveryCharge);
        this.addLength = this.addData.length;
        this.checkEnableDisableOrderButton();
        this.calculateTotal();
      })
    }
  }

  sendPaymentType(data: any) {
    this.paymentType = data;
    this.checkEnableDisableOrderButton();
    if (data === "WALLET") {
      this.router.navigate(['/payment-gateway'])
    }
  }

  plus(prod: any) {
    let updateValue = prod.quantity += 1;
    const updateObj = { "quantity": updateValue }
    let updateId = prod.id;
    if (updateValue) {
      this.auth.updateCart(updateObj, updateId).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.order = [];
        if (this.isappliedEmployeeDiscount) {
          this.applyEmployeeDiscount()
        }
      })
    }
  }

  minus(prod: any) {
    var updateZero = prod.quantity -= 1;
    const updatedObj = { "quantity": updateZero }
    var updatedId = prod.id;
    if (updateZero == 0) {
      this.auth.removeCart(updatedId).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.order = [];
        if (this.isappliedEmployeeDiscount) {
          this.applyEmployeeDiscount()
        }
      })
    }
    else {
      this.auth.updateCart(updatedObj, updatedId).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.order = [];
        if (this.isappliedEmployeeDiscount) {
          this.applyEmployeeDiscount()
        }
      })
    }
  }

  applyCoupon() {
    this.submitted = true;
    if (!this.couponForm.valid) {
      return false;
    }
    this.submitted = false;
    this.auth.applyCoupon(this.couponForm.value)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.isCouponApplied = true;
          this.isAppliedCoupon = true;
          sessionStorage.setItem("Coupon", JSON.stringify(res.data[0]));
          this.couponResponse = res.data[0];
          this.toastr.success('Success ', res.massage);
          this.couponAmount = this.calculateCouponAmount();
          this.couponForm.reset();
          this.ngOnInit();
          this.order = [];
        } else {
          this.toastr.error('Enter valid ', res.massage);
        }
      });
  }

  removeCoupon() {
    sessionStorage.removeItem("Coupon");
    this.isCouponApplied = false;
    this.isAppliedCoupon = false;
    this.couponResponseObject = null;
    this.calculateTotal();
    this.ngOnInit();
    this.order = [];
  }

  calculateCouponAmount() {
    let percentAmount = this.prodTotal * (this.couponResponse.discountPercentage / 100);
    if (percentAmount > this.couponResponse.maximumDiscount) {
      return this.couponResponse.maximumDiscount;
    }
    else {
      return percentAmount;
    }
  }

  applyLoyaltyPoint(values: any): void {
    this.isAppliedLoyaltyPoint = values.currentTarget.checked;
    // console.log(values.currentTarget.checked);
    // console.log(this.totalAmount, this.loyaltyPoint);
    if (values.currentTarget.checked == true) {
      this.auth.applyLoyaltyPoint(this.loyaltyPoint, this.totalAmount).subscribe((res: any) => {
        this.loyaltyPointDiscount = res.data;
        this.toastr.success(res.massage);
        if (this.isAppliedLoyaltyPoint) {
          this.isLoyaltyApplied = true;
          this.loyaltyPointsObject = {
            title: 'Loyalty amount',
            price: "-" + this.loyaltyPointDiscount + " BD"
          }
        }
        this.calculateTotal();
      })
    }
    else {
      this.isLoyaltyApplied = false;
      if (this.loyaltyPointDiscount > 0) {
        this.totalAmount = parseFloat(this.totalAmount) + parseFloat(this.loyaltyPointDiscount);
        this.loyaltyPointDiscount = 0;
        if (this.order.findIndex((x: any) => x.title == 'Loyalty amount') != -1) {
          this.order.splice(this.order.findIndex((x: any) => x.title == 'Loyalty amount'), 1)
        }
        this.loyaltyPointsObject = null;
      }
    }
  }

  changeDelivery(deleiveryAddModal: any) {
    var firtArr: any = [];
    firtArr.push(this.fistData);

    this.modalService.open(deleiveryAddModal, { centered: true, size: 'md' });

    this.auth.getAddress().subscribe((res: any) => {
      this.addressList = res.data.filter(function (cv: any) {
        return !firtArr.find(function (e: any) {
          return e.id == cv.id;
        });
      });
    })
  }

  selctedAddress(value: any) {
    this.deliverAddressArray = [];
    this.fistData = value;
    sessionStorage.setItem('delivAddChange', 'true')
    sessionStorage.setItem('deliveryFullAddress', JSON.stringify(this.fistData))
    this.deliverAddressArray.push(this.fistData)
    this.deliveryCharge = value.deliveryCharge.toFixed(2);
    sessionStorage.setItem('deliveryCharg', this.deliveryCharge);
    this.modalService.dismissAll();
    this.ngOnInit();
    this.order = [];
  }

  onSubmitBook(outOfStock: any) {
    const isAnyOutOfStock = this.viewData.data.some((item: any) => item.stock < item.quantity);
    if (isAnyOutOfStock) {
      this.modalService.open(outOfStock, { centered: true });
    } else {
      if (this.isHoliday) {
        this.toastr.error("Selected delivery date is Holiday. Please choose another date.");
      }
      else {
        let cardIds = this.productDetails.map((item: any) => {
          return item.id;
        });
        this.order = [];
        this.productDetailsObject.forEach((element: any) => {
          this.order.push(element);
        })

        if (this.deliveryCharge > 0) {
          this.deliveryChargeObject = {
            title: 'Delivery fee',
            price: this.deliveryCharge + " BD"
          }
          this.order.push(this.deliveryChargeObject)
        }
        if (this.couponResponseObject != undefined && this.couponResponseObject != null) {
          this.order.push(this.couponResponseObject)
        }
        if (this.loyaltyPointsObject != undefined && this.loyaltyPointsObject != null) {
          this.order.push(this.loyaltyPointsObject)
        }
        if (this.vatObject != undefined && this.vatObject != null) {
          this.order.push(this.vatObject)
        }
        if (this.loginType === "EMPLOYEE" && this.isappliedEmployeeDiscount) {
          var objjjj = {
            title: 'Employee discount',
            price: -this.totalEmployeeDiscount + " BD"
          }
          this.order.push(objjjj)
        } else if (this.loginType === "EMPLOYEE" && !this.isappliedEmployeeDiscount) {
          this.currentCartonDiscountEmployee = this.viewData?.cartonDiscount;
        }
        var totObj = {
          title: 'Total',
          price: this.totalAmount + " BD"
        }
        this.order.push(totObj)
        let cartoonCount = 0;
        let totalQuantity = 0;
        let maxCartonDiscountPerDayValue = 0;
        this.viewData.data.forEach((element: any) => {
          if (element.cartonActive == 1) {
            cartoonCount++;
            totalQuantity += element.quantity; // Assuming 'quantity' holds the number of products
            if (this.loginType === "EMPLOYEE") {
              if (this.viewData.maxCartonDiscountPerDay == 0) {
                if (this.dir == 'ltr') {
                  const msg = `Your daily carton purchase limit has been exceeded. You are allowed a maximum of ${this.viewData.defaultMaxCartonDiscountPerDayEmployee} cartons per day, and you currently have ${this.viewData.maxCartonDiscountPerDay} cartons remaining for today`
                  this.toastr.error(msg);
                } else if (this.dir == 'rtl') {
                  const msg = `لقد تم تجاوز حد شراء الكرتون اليومي. يسمح لك بحد أقصى ${this.viewData.defaultMaxCartonDiscountPerDayEmployee} كرتون في اليوم ، ولديك حاليا ${this.viewData.maxCartonDiscountPerDay} كرتون متبقية لهذا اليوم."`
                  this.toastr.error(msg);
                }
              } else if (this.viewData.maxCartonDiscountPerDay < totalQuantity) {
                if (this.dir == 'ltr') {
                  const msg = `Your cart count of ${totalQuantity} cartons exceeds both your daily limit of ${this.viewData.defaultMaxCartonDiscountPerDayEmployee} cartons and your available limit of ${this.viewData.maxCartonDiscountPerDay} cartons. Please reduce your cart to meet these limits before proceeding with your order.`
                  this.toastr.error(msg);
                } else if (this.dir == 'rtl') {
                  const msg = `عدد سلة التسوق الخاصة بك من ${totalQuantity} كرتون يتجاوز كل من الحد اليومي الخاص بك من ${this.viewData.defaultMaxCartonDiscountPerDayEmployee} كرتون والحد المتاح لديك من ${this.viewData.defaultMaxCartonDiscountPerDayEmployee} كرتون. يرجى تقليل سلة التسوق الخاصة بك لتلبية هذه الحدود قبل متابعة طلبك.`
                  this.toastr.error(msg);
                }
              } else {
                let pending = this.viewData.maxCartonDiscountPerDay - totalQuantity;
                maxCartonDiscountPerDayValue = pending < 0 ? 0 : pending;
                // console.log("order Details", this.order);
                let data = {
                  "couponName": this.couponResponse?.arCouponName,
                  "deliveryDate": formatDate(this.deliveryDAte, 'EEEE, MMM d, y', 'en-US'),
                  "orderReferenceId": "",
                  "deliveryType": this.deliveryType,
                  "deliveryAddressId": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].id,
                  "vat": this.VATSum,
                  "pickupAddress": this.deliveryType === 'PICKUP' ? JSON.stringify(this.deliverAddressArray[0]) : null,
                  "deliveryAddress": this.deliveryType === 'PICKUP' ? null : JSON.stringify(this.deliverAddressArray[0]),
                  "isLoyaltyPointApply": this.isAppliedLoyaltyPoint ? 1 : 0,
                  "LoyaltyAmount": this.isAppliedLoyaltyPoint ? this.loyaltyPointDiscount : "0.00",
                  "paymentTypeId": this.paymentType,
                  "couponId": this.couponResponse?.id,
                  "order": JSON.stringify(this.order),
                  "deliveryAddressType": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].saveAs,
                  "deliveryNotes": this.notesForm.controls['notesText'].value,
                  "deliveryOrderDate": formatDate(new Date(), 'shortDate', 'en-US'),
                  "cartId": JSON.stringify(cardIds),
                  "netAmount": this.totalAmount,
                  "deliveryCharge": this.deliveryCharge,
                  "couponAmount": this.couponVal,
                  "cartonDiscount": this.currentCartonDiscountEmployee,
                  "maxCartonDiscountPerDayUser": this.viewData?.maxCartonDiscountPerDayUser,
                  "maxCartonDiscountPerDay": maxCartonDiscountPerDayValue,
                  "employeeCartonDiscount": totalQuantity
                }
                // console.log("empCartoon", data);
                this.auth.bookOrder(data).subscribe((res: any) => {
                  if (res.success == true) {
                    this.toastr.success('Order confirmed! ', res.message);
                    this.router.navigate([`/booking-complete`]);
                    this.ngOnInit();
                  } else if (res.error == true) {
                    this.toastr.error('Order not confirmed ', res.message);
                  }
                })
              }
            } else if (this.loginType === "USER") {
              if (this.viewData.maxCartonDiscountPerDayUser == 0) {
                if (this.dir == 'ltr') {
                  const msg = `Your daily carton purchase limit has been exceeded. You are allowed a maximum of ${this.viewData.defaultMaxCartonDiscountPerDayUser} cartons per day, and you currently have ${this.viewData.maxCartonDiscountPerDayUser} cartons remaining for today`
                  this.toastr.error(msg);
                } else if (this.dir == 'rtl') {
                  const msg = `لقد تم تجاوز حد شراء الكرتون اليومي. يسمح لك بحد أقصى ${this.viewData.defaultMaxCartonDiscountPerDayUser} كرتون في اليوم ، ولديك حاليا ${this.viewData.maxCartonDiscountPerDayUser} كرتون متبقية لهذا اليوم."`
                  this.toastr.error(msg);
                }
              } else if (this.viewData.maxCartonDiscountPerDayUser < totalQuantity) {
                if (this.dir == 'ltr') {
                  const msg = `Your cart count of ${totalQuantity} cartons exceeds both your daily limit of ${this.viewData.defaultMaxCartonDiscountPerDayUser} cartons and your available limit of ${this.viewData.maxCartonDiscountPerDayUser} cartons. Please reduce your cart to meet these limits before proceeding with your order.`
                  this.toastr.error(msg);
                } else if (this.dir == 'rtl') {
                  const msg = `عدد سلة التسوق الخاصة بك من ${totalQuantity} كرتون يتجاوز كل من الحد اليومي الخاص بك من ${this.viewData.defaultMaxCartonDiscountPerDayUser} كرتون والحد المتاح لديك من ${this.viewData.maxCartonDiscountPerDayUser} كرتون. يرجى تقليل سلة التسوق الخاصة بك لتلبية هذه الحدود قبل متابعة طلبك.`
                  this.toastr.error(msg);
                }
              } else {
                let pending = this.viewData.maxCartonDiscountPerDayUser - totalQuantity;
                maxCartonDiscountPerDayValue = pending < 0 ? 0 : pending;
                // console.log("order Details", this.order);
                let data = {
                  "couponName": this.couponResponse?.arCouponName,
                  "deliveryDate": formatDate(this.deliveryDAte, 'EEEE, MMM d, y', 'en-US'),
                  "orderReferenceId": "",
                  "deliveryType": this.deliveryType,
                  "deliveryAddressId": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].id,
                  "vat": this.VATSum,
                  "pickupAddress": this.deliveryType === 'PICKUP' ? JSON.stringify(this.deliverAddressArray[0]) : null,
                  "deliveryAddress": this.deliveryType === 'PICKUP' ? null : JSON.stringify(this.deliverAddressArray[0]),
                  "isLoyaltyPointApply": this.isAppliedLoyaltyPoint ? 1 : 0,
                  "LoyaltyAmount": this.isAppliedLoyaltyPoint ? this.loyaltyPointDiscount : "0.00",
                  "paymentTypeId": this.paymentType,
                  "couponId": this.couponResponse?.id,
                  "order": JSON.stringify(this.order),
                  "deliveryAddressType": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].saveAs,
                  "deliveryNotes": this.notesForm.controls['notesText'].value,
                  "deliveryOrderDate": formatDate(new Date(), 'shortDate', 'en-US'),
                  "cartId": JSON.stringify(cardIds),
                  "netAmount": this.totalAmount,
                  "deliveryCharge": this.deliveryCharge,
                  "couponAmount": this.couponVal,
                  "cartonDiscount": this.viewData?.cartonDiscount,
                  "maxCartonDiscountPerDayUser": maxCartonDiscountPerDayValue,
                  "maxCartonDiscountPerDay": this.viewData?.maxCartonDiscountPerDay,
                  "userCartonDiscount": totalQuantity
                }
                // console.log("UserCartoon", data);
                this.auth.bookOrder(data).subscribe((res: any) => {
                  if (res.success == true) {
                    this.toastr.success('Order confirmed! ', res.message);
                    this.router.navigate([`/booking-complete`]);
                    this.ngOnInit();
                  } else if (res.error == true) {
                    this.toastr.error('Order not confirmed ', res.message);
                  }
                })
              }

            }
          } else {
            let data = {
              "couponName": this.couponResponse?.arCouponName,
              "deliveryDate": formatDate(this.deliveryDAte, 'EEEE, MMM d, y', 'en-US'),
              "orderReferenceId": "",
              "deliveryType": this.deliveryType,
              "deliveryAddressId": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].id,
              "vat": this.VATSum,
              "pickupAddress": this.deliveryType === 'PICKUP' ? JSON.stringify(this.deliverAddressArray[0]) : null,
              "deliveryAddress": this.deliveryType === 'PICKUP' ? null : JSON.stringify(this.deliverAddressArray[0]),
              "isLoyaltyPointApply": this.isAppliedLoyaltyPoint ? 1 : 0,
              "LoyaltyAmount": this.isAppliedLoyaltyPoint ? this.loyaltyPointDiscount : "0.00",
              "paymentTypeId": this.paymentType,
              "couponId": this.couponResponse?.id,
              "order": JSON.stringify(this.order),
              "deliveryAddressType": this.deliveryType === 'PICKUP' ? null : this.deliverAddressArray[0].saveAs,
              "deliveryNotes": this.notesForm.controls['notesText'].value,
              "deliveryOrderDate": formatDate(new Date(), 'shortDate', 'en-US'),
              "cartId": JSON.stringify(cardIds),
              "netAmount": this.totalAmount,
              "deliveryCharge": this.deliveryCharge,
              "couponAmount": this.couponVal,
              "cartonDiscount": this.viewData?.cartonDiscount,
              "maxCartonDiscountPerDayUser": this.viewData?.maxCartonDiscountPerDayUser,
              "maxCartonDiscountPerDay": this.viewData?.maxCartonDiscountPerDay
            }
            // console.log("piece", data);
            this.auth.bookOrder(data).subscribe((res: any) => {
              if (res.success == true) {
                this.toastr.success('Order confirmed! ', res.message);
                this.router.navigate([`/booking-complete`]);
                this.ngOnInit();
              } else if (res.error == true) {
                this.toastr.error('Order not confirmed ', res.message);
              }
            })
          }
        });
      }
    }
  }

  onSubmitData() {
    this.submitted = true;
    if (this.addressForm.invalid) {
      return false;
    }

    if (this.isEdit) {
      this.addressEditServie(this.addressForm.value)
      return;
    }

    var zoneNameArray = this.zoneData.filter((element: any) => {
      return element.id === Number(this.addressForm.value.zoneId);
    })
    this.submitted = false;
    this.addressForm.value.latitude = (this.selectedLat).toFixed(4);
    this.addressForm.value.longitude = (this.selectedLng).toFixed(4);
    this.addressForm.value.zoneId = Number(this.addressForm.value.zoneId);
    if (this.dir == 'ltr') {
      this.addressForm.value.zoneName = zoneNameArray[0]?.name;
    } else if (this.dir == 'rtl') {
      this.addressForm.value.zoneName = zoneNameArray[0]?.arName;
    } this.auth.add_Address(this.addressForm.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success('Success ', res.message);
          this.addressForm.reset();
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.message);
        }
      });
  }

  addressEditServie(data: any) {
    var zoneNameArray = this.zoneData.filter((element: any) => {
      return element.id === Number(data.zoneId);
    })
    // console.log("name", zoneNameArray)
    if (this.dir == 'ltr') {
      data['zoneName'] = zoneNameArray[0]?.name;
    } else if (this.dir == 'rtl') {
      data['zoneName'] = zoneNameArray[0]?.arName;
    } data['zoneId'] = Number(data.zoneId);

    this.auth.updateAddress(data, this.addressId)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success('Success ', res.message);
          this.addressForm.reset();
          this.submitted = false;
          this.modalService.dismissAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.message);
        }
      });
  }

  editAddress(data: any, content: any) {
    this.modalService.open(content, { centered: false, backdrop: 'static', keyboard: false, windowClass: 'custom-class' });
    this.isEdit = true;
    this.addressId = data['id'];
    this.auth.getArea(data['zoneId']).subscribe(
      (res: any) => {
        this.areaList = res.data;
      });
    this.addressForm = this.builder.group({
      zoneId: [data['zoneId']],
      area: [data['area']],
      blockNo: [data['blockNo']],
      houseNo: [data['houseNo']],
      roadNo: [data['roadNo']],
      pin: [data['pin']],
      flat: [data['flat']],
      notes: [data['notes']],
      saveAs: [data['saveAs']],
    });
  }

  calculateTotal() {
    this.totalAmount = ((this.VATSum == undefined ? 0 : this.VATSum) + this.prodTotal).toFixed(2);

    if (this.isAppliedLoyaltyPoint) {
      this.totalAmount = parseFloat(this.totalAmount) - parseFloat(this.loyaltyPointDiscount);
    }

    if (this.deliveryType === "DELIVERY") {
      this.totalAmount = parseFloat(this.deliveryCharge) + parseFloat(this.totalAmount);
    }

    if (this.isAppliedCoupon === true) {
      this.totalAmount = parseFloat(this.totalAmount) - parseFloat(this.couponAmount);
    }

    if (this.loginType === "EMPLOYEE" && this.isappliedEmployeeDiscount) {
      this.totalAmount = parseFloat(this.totalAmount) - parseFloat(this.totalEmployeeDiscount);
    }
    this.totalAmount = parseFloat(this.totalAmount).toFixed(2);
    this.checkEnableDisableOrderButton();
  }

  checkEnableDisableOrderButton() {
    if (this.deliveryType != "PICKUP") {
      if (this.getAddress?.length > 0 && this.paymentType != null && this.paymentType != undefined) {
        this.IsSubmitButtonEnable = false;
      }
      else {
        this.IsSubmitButtonEnable = true;
      }
    } else {
      if (this.paymentType != null && this.paymentType != undefined) {
        this.IsSubmitButtonEnable = false;
      }
      else {
        this.IsSubmitButtonEnable = true;
      }
    }


    if (this.totalAmount >= this.viewData?.walletBalance && this.paymentType === "WALLET") {
      this.IsSubmitButtonEnable = true;
    }
  }

  applyEmployeeDiscountFromHTML(event: any) {
    this.isappliedEmployeeDiscount = event.currentTarget.checked;
    if (this.isappliedEmployeeDiscount == true) {
      this.applyEmployeeDiscount();
    } else {
      this.currentCartonDiscountEmployee = this.viewData?.cartonDiscount;
    }
  }

  applyEmployeeDiscount() {
    let IsActiveAcrton = false;
    let cartoonProduct: any;
    let maxIteration: any;
    if (this.isappliedEmployeeDiscount == true && this.loginType === "EMPLOYEE") {
      if (this.viewData?.cartonDiscount > 0) {
        this.viewData.data.forEach((element: any) => {
          if (element.cartonActive == 1) {
            IsActiveAcrton = true;
          }
        });

        if (IsActiveAcrton) {
          this.totalEmployeeDiscount = 0.0;
          cartoonProduct = this.cartoonDiscountProductCount()?.data;
          maxIteration = this.cartoonDiscountProductCount()?.maxIteration;
          this.currentCartonDiscountEmployee = this.viewData?.cartonDiscount;
          for (let index = 0; index < maxIteration; index++) {
            if (this.currentCartonDiscountEmployee > 0) {
              let item = cartoonProduct[index];
              let quantity = item.quantity > this.currentCartonDiscountEmployee ? this.currentCartonDiscountEmployee : item.quantity;
              this.currentCartonDiscountEmployee = this.currentCartonDiscountEmployee - quantity;
              let totalWeight = parseFloat(item.weight) * (parseFloat(item.noOfPieces) * (parseFloat(this.viewData?.cartonDiscount) - parseFloat(this.currentCartonDiscountEmployee)) == 0 ? 1 : (parseFloat(item.noOfPieces) * (parseFloat(this.viewData?.cartonDiscount) - parseFloat(this.currentCartonDiscountEmployee))));
              let kilograms = totalWeight / 1000;
              let discountFills = kilograms * 100;
              let discountBD = discountFills / 1000;
              this.totalEmployeeDiscount += discountBD;
            }
          }
        }
      }
    }
    this.calculateTotal();
  }

  cartoonDiscountProductCount() {
    let returnValue: any = [];
    let data: any = [];
    this.viewData.data.forEach((element: any) => {
      if (element.cartonActive == 1) {
        data.push(element);
      }
    });
    returnValue.data = data;
    returnValue.maxIteration = data.length >= this.viewData?.cartonDiscount ? this.viewData?.cartonDiscount : data.length;
    return returnValue;
  }

  onDateChange(event: any) {
    this.isHoliday = false;
    this.viewData.holidayList.forEach((element: any) => {
      var date = formatDate(event.value._d, 'dd/MM/yyyy', 'en-US');
      if (element === date) {
        this.isHoliday = true;
      }
    });

    if (!this.isHoliday) {
      this.deliveryDAte = event.value._d;
    }
    this.deliveryDAte = event.value._d; // Need to remove
  }

}
