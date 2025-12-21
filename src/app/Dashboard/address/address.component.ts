import { Component, NgZone } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
declare const google: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  standalone: false
})

export class AddressComponent {
  addLength: any;
  getAddress: any;
  addressForm!: FormGroup;
  submitted = false;
  saveButton: any;
  userId: any;
  pincodeData: any;
  isEdit = false;
  addressId: any;
  map: any;
  marker: any;
  selectedLat: any;
  selectedLng: any;
  selectedArea: any;
  canOpenMap: boolean = true;
  isMapSaveButtonEnabled: boolean = true;
  websiteFlow: any;
  zoneData: any;
  areaList: any;
  dir: any;

  options: AnimationOptions = {
    path: '../../../assets/images/Animations/84767-no-access-to-location.json'
  };

  constructor(private auth: AuthService, private builder: FormBuilder, private toastr: ToastrService,
    private dialog: MatDialog, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.websiteFlow = localStorage.getItem('flow');

    this.auth.getAddress().subscribe((res: any) => {
      // console.log(res.data);
      this.getAddress = res.data;
      this.addLength = this.getAddress.length;
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
  }

  get f() { return this.addressForm.controls; }

  onZoneChange(value: any) {
    this.auth.getArea(value).subscribe(
      (res: any) => {
        this.areaList = res.data;
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

  private fetchZonesAndPincodes() {
    this.auth.getZones().subscribe((res: any) => {
      this.zoneData = res.data;
    });

    this.auth.getPincode().subscribe((res: any) => {
      this.pincodeData = res.data;
    });
  }

  openModal(content: any) {
    this.canOpenMap = true;
    this.addressForm.reset();
    this.isEdit = false;
    this.submitted = false;
    // this.addressForm.controls["area"].value = this.selectedArea;
    this.fetchZonesAndPincodes();
    this.dialog.open(content, { disableClose: true, panelClass: 'custom-class' });
  }
  openMap() {
    this.canOpenMap = false;
    this.isMapSaveButtonEnabled = true;

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


  sendSaveAs(data: any) {
    this.addressForm.value.saveAs = data;
    this.saveButton = data;
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
    if (this.dir === 'ltr') {
      this.addressForm.value.zoneName = zoneNameArray[0]?.name;
    } else if (this.dir === 'rtl') {
      this.addressForm.value.zoneName = zoneNameArray[0]?.arName;
    }
    // console.log("fef",this.addressForm.value)
    this.auth.add_Address(this.addressForm.value)
      .subscribe((res: any) => {
        if (res.error === false) {
          this.toastr.success('Success ', res.message);
          this.addressForm.reset();
          this.dialog.closeAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.message);
        }
      });
  }

  editAddress(data: any, content: any) {
    this.fetchZonesAndPincodes();
    this.dialog.open(content, { disableClose: true, panelClass: 'custom-class' });
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

  addressEditServie(data: any) {
    var zoneNameArray = this.zoneData.filter((element: any) => {
      return element.id === Number(data.zoneId);
    })
    if (this.dir === 'ltr') {
      data['zoneName'] = zoneNameArray[0]?.name;
    } else if (this.dir === 'rtl') {
      data['zoneName'] = zoneNameArray[0]?.arName;
    }
    data['zoneId'] = Number(data.zoneId);
    this.auth.updateAddress(data, this.addressId)
      .subscribe((res: any) => {
        if (res.error === false) {
          this.toastr.success('Success ', res.message);
          this.addressForm.reset();
          this.submitted = false;
          this.dialog.closeAll();
          this.ngOnInit();
        } else {
          this.toastr.error('Enter valid ', res.message);
        }
      });
  }

  removeAddress(id: any) {
    this.auth.removeAddress(id).subscribe((res: any) => {
      if (res.error === false) {
        this.toastr.success('Success ', res.message);
        this.ngOnInit();
      } else {
        this.toastr.error('Enter valid ', res.message);
      }
    })
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
          if (status === google.maps.GeocoderStatus.OK) {
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
    this.canOpenMap = true;
  }

}

