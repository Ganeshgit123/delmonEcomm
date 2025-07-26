import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.baseUrl;
  // s3Endpoint = environment.s3Url;
  accToken = sessionStorage.getItem('token');

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')

  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 401 || error.status === 403) {
        // this.injector.get(UserService).purgeAuth();
        // this.injector.get(ToasterService).showError(`Unauthorized`, errorMsg);
        // this.injector.get(Router).navigateByUrl(`/login`);
        this.router.navigate(['/login']);
        // console.log('errorthrows');
      }

      // console.log('error', msg);
    }
    return throwError(msg);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getLanguage() {
    return localStorage.getItem('lang');
  }

  getWebFlow() {
    return localStorage.getItem('flow');
  }

  getCategory(type: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('type', type)
    return this.http.get<any>(`${this.endpoint}/home`,
      { headers: headers });
  }

  getProduct(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('categoryId', id)
    return this.http.get<any>(`${this.endpoint}/product`,
      { params: param1 });
  }

  getSubcategory(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('categoryId', id)
    return this.http.get<any>(`${this.endpoint}/subCategory`,
      { params: param1 });
  }

  getRecipies(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('categoryId', id)
    return this.http.get<any>(`${this.endpoint}/recipies`,
      { params: param1 });
  }


  sendOtpcheckUser(inputdata: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/auth/sendOtp`, inputdata);
  }

  adminLoginUser(inputdata: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/auth/adminLogin`, inputdata);
  }

  verifyOtp(data: any) {
    return this.http.post(`${this.endpoint}/auth/verifyOtp`, data);
  }

  verifyMerchant(data: any) {
    return this.http.post(`${this.endpoint}/auth/createUser`, data);
  }

  verifyEmployee(data: any) {
    return this.http.post(`${this.endpoint}/auth/createUser`, data);
  }

  verifyUser(data: any) {
    return this.http.post(`${this.endpoint}/auth/createUser`, data);
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}`, { headers: headers });
  }

  getCategories() {
    return this.http.get<any>(`${this.endpoint}/category`);
  }

  profileUpdate(data: any) {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/update`, data, { headers: headers });
  }
  getProductDetails(id: any) {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/productDetail/${id}`, { headers: headers });
  }

  getProductDetailsF(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('categoryId', id)
    return this.http.get<any>(`${this.endpoint}/product`,
      { params: param1 });
  }


  searchProduct(data: any): Observable<any> {
    const param1 = new HttpParams()
      .set('searchValue', data)
    return this.http.get<any>(`${this.endpoint}/product`,
      { params: param1 });
  }

  addtoCart(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/cart`, data, { headers: headers });
  }


  viewCart(): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/cart/view`, { headers: headers });
  }


  updateCart(data: any, id: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/cart/${id}`, data, { headers: headers });
  }

  removeCart(id: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.delete(`${this.endpoint}/cart/${id}`, { headers: headers });
  }

  createBasket(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/basket`, data, { headers: headers });
  }

  viewBasket(): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/basket/list`, { headers: headers });
  }

  removeBasket(id: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/basket/delete/${id}`, id, { headers: headers });
  }

  addProductBasket(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/basketProductList`, data, { headers: headers });
  }

  viewProductBasket(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('basketId', id)
    return this.http.get<any>(`${this.endpoint}/basketProductList/list`,
      { params: param1 });
  }

  removeProductBasket(id: any): Observable<any> {
    const param1 = new HttpParams()
    // .set('basketId', id)
    return this.http.post(`${this.endpoint}/basketProductList/delete/${id}`, { params: param1 });
  }

  getAdminBasket(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/product/basket`);
  }

  getBasketProductDetail(id: any) {
    return this.http.get<any>(`${this.endpoint}/basket/productDetail/${id}`)
  }

  adminBasketToCart(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('productId', id)
    return this.http.get(`${this.endpoint}/adminBasketToCart/`, { params: param1 });
  }

  basketToCart(id: any): Observable<any> {
    return this.http.get(`${this.endpoint}/basketToCart/${id}`, id);
  }

  viewHome(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/home`);
  }

  setFavorites(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/favorites`, data, { headers: headers });
  }

  getFavorites(): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/favorites/get`, { headers: headers });
  }

  add_Address(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/address`, data, { headers: headers });
  }

  getZones(): Observable<any> {
    return this.http.get(`${this.endpoint}/zone`);
  }

  getArea(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('zoneId', id)
    return this.http.get(`${this.endpoint}/findArea`, { params: param1 });
  }

  getPincode(): Observable<any> {
    return this.http.get(`${this.endpoint}/pin`);
  }

  getAddress(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/address/list`);
  }

  updateAddress(data: any, id: any): Observable<any> {
    return this.http.post(`${this.endpoint}/address/${id}`, data);
  }

  removeAddress(id: any): Observable<any> {
    const param1 = new HttpParams()
    return this.http.post(`${this.endpoint}/address/delete/${id}`, { params: param1 });
  }

  getOrder(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/order`,
      {
        params: new HttpParams()
          .set('orderType', "PLACED,APPROVE")
      });
  }

  confirmOrder(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/order`,
      {
        params: new HttpParams()
          .set('orderType', "USERACCEPTED,DRIVERASSIGNED,OUTFORDELIVERY,UNAVAILABLE")
      });
  }

  bookOrder(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/order`, data, { headers: headers });
  }

  completeOrder(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/order`,
      {
        params: new HttpParams()
          .set('orderType', "COMPLETED")
      });
  }

  cancelOrder(id: any): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/order`,
      {
        params: new HttpParams()
          .set('orderType', "USERREJECTED,CANCELLED")
      });
  }

  getOrderDetails(id: any): Observable<any> {
    const param1 = new HttpParams()
      .set('orderId', id)
    return this.http.get<any>(`${this.endpoint}/order/getOrderDetails`, { params: param1 });
  }

  add_Wallet(data: any, id: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', id)
    return this.http.post(`${this.endpoint}/wallet/add`, data, { headers: headers });
  }

  get_Wallet(id: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', id)
    return this.http.get<any>(`${this.endpoint}/wallet`, { headers: headers });
  }

  applyCoupon(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/coupon/apply`, data, { headers: headers });
  }

  getLoyaltyPoints(): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/loyaltyPoints`, { headers: headers });
  }

  applyLoyaltyPoint(points: any, price: any): Observable<any> {
    const param1 = new HttpParams()
      .set('totalLoyaltyPoint', points)
      .set('totalAmount', price)
    return this.http.get<any>(`${this.endpoint}/applyLoyaltyPoints`, { params: param1 });
  }

  declineOrder(id: any, data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post<any>(`${this.endpoint}/order/${id}`, data, { headers: headers })
  }

  reOrderFunc(id: any) {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/order/reOrder/${id}`, { headers: headers })
  }

  settingsUrl(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/url`);
  }

  sendFeedback(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.post(`${this.endpoint}/report`, data, { headers: headers });
  }

  getTrendingProducts() {
    const headers = new HttpHeaders()
      .set('userId', `${sessionStorage.getItem('userId')}`)
    return this.http.get<any>(`${this.endpoint}/trendingProduct`, { headers: headers });
  }
}


