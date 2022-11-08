import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }


  // --------------LIST-API------------------
  getUserList() {
    return this.http.get('http://localhost:3333/userList');
  }

  getBlockList(){
    return this.http.get('http://localhost:3333/blockList');
  }

  getDistrictList(){
   return this.http.get('http://localhost:3333/districtList');
  }

  getComplaintList(){
    return this.http.get('http://localhost:3333/complaintList');
  }

  getEventList(){
    return this.http.get('http://localhost:3333/eventList');
  }

  getPanchayatList(){
    return this.http.get('http://localhost:3333/panchayatList')
  }

  getCategoryList(){
    return this.http.get('http://localhost:3333/categoryList');
  }

  getSubCategoryList(){
    return this.http.get('http://localhost:3333/subCategoryList');
  }

  getNotificationList(){
    return this.http.get('http://localhost:3333/notificationList');
  }

  getRoleList(){
    return this.http.get('http://localhost:3333/roleList');
  }

  getWardList(){
    return this.http.get('http://localhost:3333/wardList');
  }

  // --------------------ADD FORM API--------------------------

  addBlock(data : any){
    return this.http.post('http://localhost:3333/addBlock', data);
  }

  addPanchayat(data : any){
    return this.http.post('http://localhost:3333/addPanchayat', data);
  }

  addCategory(data : any){
    return this.http.post('http://localhost:3333/addCategory', data);
  }

  addSubCategory(data : any){
    return this.http.post('http://localhost:3333/addSubCategory', data);
  }

  addDistrict(data : any){
    return this.http.post('http://localhost:3333/addDistrict', data);
  }

  addWard(data : any){
    return this.http.post('http://localhost:3333/addWard', data);
  }

  addEvent(data : any){
    return this.http.post('http://localhost:3333/addEvent', data);
  }

  addUser(data : any){
    return this.http.post('http://localhost:3333/addUser', data);
  }
 
  
// -------------   USERLIST DROPDOWN API ------------------

  getStateDDList(){
    return this.http.get('http://localhost:3333/stateDDList');
  }

  getDistrictDDList(StateId : number){
    return this.http.get('http://localhost:3333/districtDDList/ ' + StateId);
  }

  getBlockDDList(DistrictId : number){
    return this.http.get('http://localhost:3333/blockDDList/'+ DistrictId);
  }

  getPanchayatDDList(BlockId : number){
    return this.http.get('http://localhost:3333/panchayatDDList/' + BlockId);
  }

  getWardDDList(PanchayatId : number){
    return this.http.get('http://localhost:3333/wardDDList/' + PanchayatId);
  }

  getCategoryDDList(){
    return this.http.get('http://localhost:3333/categoryDDList');
  }

  GetComplaintStatus(){
    return this.http.get('http://localhost:3333/GetStatusList');
  }

  // ------------------------------------------ GET BY ID ----------------------------------------------

  getUserById( UserId : number ){
    return this.http.get('http://localhost:3333/users/' + UserId );
  }

  getCategoryById( CategoryId : number ){
    return this.http.get('http://localhost:3333/category/' + CategoryId );
  }

  getSubCategoryById(SubCategoryId : number){
    return this.http.get('http://localhost:3333/subCategory/' + SubCategoryId );
  }

  getDistrictById( DistrictId : number ){
    return this.http.get('http://localhost:3333/districts/' + DistrictId );
  }

  getBlockById( BlockId : number ){
    return this.http.get('http://localhost:3333/blocks/' + BlockId );
  }

  getPanchayatById( PanchayatId : number ){
    return this.http.get('http://localhost:3333/panchayat/' + PanchayatId );
  }

  getWardById( WardId : number ){
    return this.http.get('http://localhost:3333/ward/' + WardId );
  }

  getComplaintById( ComplaintsId : number ){
    return this.http.get('http://localhost:3333/complaints/' + ComplaintsId );
  }

  getEventById( EventId : number ){
    return this.http.get('http://localhost:3333/events/' + EventId );
  }

  getAssignToById(UserId : number){
    return this.http.get('http://localhost:3333/assignToDDList/' + UserId);
  }

  GetMyComplaintListByUserId(UserId : number){
    return this.http.get('http://localhost:3333/myComplaints/' + UserId);
  }

  // ------------------------------------------  EDIT FORM API ---------------------------------------------

  updateUser( userData : any ){
    return this.http.put('http://localhost:3333/updateUser', userData);
  }

  updateCategory( categoryData : any ){
    return this.http.put('http://localhost:3333/updateCategory', categoryData);
  }

  updateSubCategory( subCategoryData : any){
    return this.http.put('http://localhost:3333/updateSubCategory', subCategoryData);
  }
  
  updateDistrict( districtData : any){
    return this.http.put('http://localhost:3333/updateDistrict', districtData);
  }

  updateBlock( blockData : any ){
    return this.http.put('http://localhost:3333/updateBlock', blockData);
  }

  updatePanchayat( PanchayatData : any){
    return this.http.put('http://localhost:3333/updatePanchayat', PanchayatData);
  }

  updateWard( wardData : any ){
    return this.http.put('http://localhost:3333/updateWard', wardData);
  }

  updateComplaint( complaintData : any ){
    return this.http.put('http://localhost:3333/updateComplaintWeb', complaintData);
  }

  updateEvent( eventData : any){
    return this.http.put('http://localhost:3333/updateEvent', eventData);
  }

  // -------------------------------Reporting Total Count---------------------------------------
  
  getRegionCounts(){
    return this.http.get('http://localhost:3333/totalCounts');
  }

  // ---------------------------Event Graph Data---------------------------

  getEventGraphlist(){
    return this.http.get('http://localhost:3333/GetEventGraphData');
  }
}
