import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AnalyticService } from '../analytic.service';
import { MatOption, MatSelect } from '@angular/material';
import { NgModel, FormControlName } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
declare var Packery: any;
declare var Draggabilly: any;

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit {
  brands :Array<any>=[];
  models :Array<any>=[];
  locations :Array<any>=[];
  arcs :Array<any>=[];
  constructor(private analyticService: AnalyticService, 
    private cd: ChangeDetectorRef,
    private fb:FormBuilder) { }

  filterForm:FormGroup;
  draggableElems: any;
  response: any;
  elem: any;
  hasModelList: boolean = false;
  pckry: any;
  draggies: Array<any> = [];
  modelList: any;
  arcResponse: any;
  mobileBrandResponse: any;
  cityResponse: any;
  isLoading: boolean = false;
  startDate: any;
  endDate: any;
  brandValue: any;
  modelValue: any;
  locationValue: any;
  arcValue: any;
  isSearched: boolean = false;
  filtersObj: any;
  selectBrandBool:boolean= true;
  endDateValue;
  todayDate: Date= new Date()
  currentUser = localStorage.getItem('currentUser');

  @ViewChild('allBrandSelected') private allBrandSelected: MatOption;
  @ViewChild('allArcSelected') private allArcSelected: MatOption;
  @ViewChild('allModelSelected') private allModelSelected: MatOption;
  @ViewChild('allLocationSelected') private allLocationSelected: MatOption;
  @ViewChild('brandSelect') brandSelect: MatSelect;
  @ViewChild('selectOption') selectOption: MatOption;
  onLoadRequestObj = {
    "action":"AMS",
    "countryId": localStorage.getItem("countryId"),
    "currOrderState": "",
    "brandIds": [],
    "modelIds": [],
    "stateIds": [],
    "arcIds" : [],
    "fromDate": "",
    "toDate": ""    
    
  }
  /*declation of input parameter for dashboard items*/
  @Input() public show: boolean;

  @Output()
  changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**Declearation for show hide panel content */
  isToggle: boolean = true;
  isToggle1: boolean = true;
  startDateValue = new Date();
  
  getDateValue;

  ngOnInit() {
    
    
    
    this.getBrandNames();
    this.getLocation();
    this.getARCList();
    this.filterForm = this.fb.group({
      brandValue: new FormControl(''),
      modelValue: new FormControl(''),
      locationValue: new FormControl(''),
      startDate: new FormControl(new Date(this.startDateValue.setDate(this.startDateValue.getDate()- this.startDateValue.getDate()+1))),
      endDate: new FormControl(this.todayDate),
      arcValue: new FormControl('')
    });
    // this.getDateValue = this.filterForm.controls.endDate.value.getDate();
    // parseInt(this.filterForm.controls.startDate.setValue) = this.getDateValue - this.getDateValue+1
    
  }
  
  selectAll(ev){
   
// if(ev.target.selected){
//   console.log("selected")
// }else{
//   console.log("not selected")
// }
// this.brands.setValue([]);
  // if(this.selectBrandBool==false){ 
  //   //  if(ev._selected){
  //     this.selectBrandBool=true;
  //     this.brands.setValue(this.mobileBrandResponse);
  //     ev._selected=true;
  //   // }
  // }else{
  //   // if(ev._selected==false){
  //     this.selectBrandBool=false;
  //     this.brands.setValue([]);
  //     ev._selected=false
  //   // }
  // }
  
  }

  tosslePerOne(ev){ 
    
    if (this.allBrandSelected.selected) {  
     this.allBrandSelected.deselect();
     this.selectBrandBool= false
     return false;
    }else{
      if(this.filterForm.controls.brandValue.value.length == this.mobileBrandResponse.length){
        
        this.allBrandSelected.select();
        // this.brandSelect.value="All"
        }
      }
      this.brands = this.filterForm.controls.brandValue.value
    }
   


    toggleAllSelection(ev) {
      
      // if(this.selectBrandBool==false){
      //   ev._selected=false;
      //   // this.allBrandSelected._selected=false
      // }
      if (this.allBrandSelected.selected) {
        this.filterForm.controls.brandValue.patchValue([...this.mobileBrandResponse.map(item => item.deviceBrandId), 0])
        
        ev._selected=true
     } else {
       this.filterForm.controls.brandValue.setValue([]);
      
     }
     this.brands = this.filterForm.controls.brandValue.value
   }

   tossleLocationPerOne(all){ 
    
    if (this.allLocationSelected.selected) {  
     this.allLocationSelected.deselect();
    //  all._selected=false;
     return false;
    }else{
      if(this.filterForm.controls.locationValue.value.length == this.cityResponse.length){
        
        this.allLocationSelected.select();
        }
      }
      this.locations = this.filterForm.controls.locationValue.value
    }
   
    toggleLocationAllSelection(ev) {
      
      if (this.allLocationSelected.selected) {
        this.filterForm.controls.locationValue.patchValue([...this.cityResponse.map(item => item.cityMasterId), 0])
        
        ev._selected=true
     } else {
       this.filterForm.controls.locationValue.setValue([]);
      
     }
     this.locations = this.filterForm.controls.locationValue.value
   }

   tossleModelPerOne(all){ 
    
    if (this.allModelSelected.selected) {  
     this.allModelSelected.deselect();
    //  all._selected=true
     return false;
    }else{
      if(this.filterForm.controls.modelValue.value.length == this.modelList.length){
        
        this.allModelSelected.select();
        }
      }
      this.models = this.filterForm.controls.modelValue.value
    }

    arcPerOne(all){ 
    
      if (this.allArcSelected.selected) {  
       this.allArcSelected.deselect();
      //  this.selectBrandBool= false
       return false;
      }else{
        if(this.filterForm.controls.arcValue.value.length == this.arcResponse.length){
          
          this.allArcSelected.select();
          // this.brandSelect.value="All"
          }
        }
        this.arcs = this.filterForm.controls.arcValue.value
      }
   
    toggleModelAllSelection(ev) {
      
      if (this.allModelSelected.selected) {
        this.filterForm.controls.modelValue.patchValue([...this.modelList.map(item => item.deviceModelId), 0])
        
        ev._selected=true
     } else {
       this.filterForm.controls.modelValue.setValue([]);
      
     }
     this.models = this.filterForm.controls.modelValue.value
   }

  
    
  setFilter() {
     
    let brandArray = [];
    let modelArray = [];
    let locationArray = [];
    let arcArray = [];
    for (let i = 0; i < this.filterForm.controls.brandValue.value.length; i++) {
      brandArray.push(this.brands[i]);
    }
    for (let i = 0; i < this.filterForm.controls.modelValue.value.length; i++) {
      modelArray.push(this.models[i]);
    }
    
    for (let i = 0; i < this.filterForm.controls.locationValue.value.length; i++) {
      locationArray.push(this.locations[i]);
    }
    for (let i = 0; i < this.filterForm.controls.arcValue.value.length; i++) {
      arcArray.push(this.arcs[i]);
    }
    this.onLoadRequestObj.brandIds = brandArray;
    this.onLoadRequestObj.modelIds = modelArray;
    this.onLoadRequestObj.stateIds = locationArray;
    this.onLoadRequestObj.arcIds = arcArray;
    console.log('arcid coming', arcArray);
    this.onLoadRequestObj.fromDate = this.convertDate(this.filterForm.controls.startDate.value);
    this.onLoadRequestObj.toDate = this.convertDate(this.filterForm.controls.endDate.value);
    this.filtersObj = JSON.parse(JSON.stringify(this.onLoadRequestObj));
    console.log('filtersObj ayya kya', this.filtersObj)
    
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  getLocation() {
    var obj = {
      "countryId": localStorage.getItem("countryId")
    }

    this.analyticService.getCityLocation(obj).subscribe(
      (res) => {

        this.cityResponse = res.responseObj;
      },
      (err) => {

      }
    )
  }

  toggleArcAllSelection(ev) {
      
    if (this.allArcSelected.selected) {
      this.filterForm.controls.arcValue.patchValue([...this.arcResponse.map(item => item.arcId), 0])
      
      ev._selected=true
   } else {
     this.filterForm.controls.arcValue.setValue([]);
    
   }
   this.arcs = this.filterForm.controls.arcValue.value
 }
  
  getBrandModel(brands) {
    
    if(brands.length>0){
      this.hasModelList = true;
    }
    this.modelValue = '';
    let brandId = [];
    if (typeof brands != "undefined") {
      for (let i = 0; i < brands.length; i++) {
        brandId.push(brands[i])
      }
      if(brandId.length==0){
        this.hasModelList=false;        
      }
      let obj = {
        "bandIds": brandId,
        "countryId": localStorage.getItem("countryId")
      }
      this.isLoading = true
      this.analyticService.getBrandModelList(obj).subscribe(
        (res) => {
          this.isLoading = false
          this.modelList = res.responseObj;
        }
      )
    }
  }

  getARCList() {
    debugger;
    let formData: FormData = new FormData();
    let id = localStorage.getItem("countryId");
    formData.append("countryId", id);

    this.analyticService.getARCPartner(formData).subscribe(
        (res) => {
            if (res.responseCode == "200") {
                console.log("arc value", res.responseObj)
                this.isLoading = false;
                this.arcResponse = res.responseObj;
            }

        },
        (err) => {
            this.isLoading = false;
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
        }

    )


}

  getBrandNames() {
    var obj = {
      "countryId":localStorage.getItem("countryId"),
      "action":"AMS"
    }

    this.analyticService.getMobileBrandName(obj).subscribe(
      (res) => {
        this.mobileBrandResponse = res.responseObj;
      }
    )
  }

  disableFilter() {
    
    if (((typeof this.filterForm.controls.brandValue == 'undefined' || this.filterForm.controls.brandValue.value.length < 1) ||
      (typeof this.filterForm.controls.modelValue == 'undefined' || this.filterForm.controls.modelValue.value.length < 1) ||
      (typeof this.filterForm.controls.locationValue == 'undefined' || this.filterForm.controls.locationValue.value.length < 1) ||
      (typeof this.filterForm.controls.arcValue == 'undefined' || this.filterForm.controls.arcValue.value.length < 1) ||
      ((typeof this.filterForm.controls.startDate == 'undefined' || !this.filterForm.controls.startDate) ||
      (typeof this.filterForm.controls.endDate == 'undefined' || !this.filterForm.controls.endDate))))
      {
      return true;
    }
    else {
      return false;
    }
  }

  // disableFilter() {
  //   
  //   console.log("start date", typeof(this.startDate))
  //   console.log("start date2", (this.startDate))
  //   if (((typeof this.filterForm.controls.brandValue == 'undefined' ) ||
  //     (typeof this.modelValue == 'undefined' || this.modelValue.length < 1) ||
  //     (typeof this.locationValue == 'undefined' || this.locationValue.length < 1) ||
  //     (typeof this.modelValue == 'undefined' || this.modelValue.length < 1))
  //      ||
  //     ((typeof this.startDate == 'undefined' || !this.startDate) ||
  //     (typeof this.endDate == 'undefined' || !this.endDate))) 
  //     {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  ngAfterViewInit() {
    this.draggableElems = document.querySelectorAll('.grid-item');
    this.elem = document.querySelector('.grid');
    this.pckry = [];
    this.cd.detectChanges();
    this.draggable();
  }



  draggable() {
    for (let i = 0, len = this.draggableElems.length; i < len; i++) {
      let draggableElem = this.draggableElems[i];
      let draggie = new Draggabilly(draggableElem, {
        containment: '.grid',
        handle: '.handle'
      });
      let pckry = new Packery(this.elem, {
        itemSelector: '.grid-item',
        gutter: 0
      });
      pckry.bindDraggabillyEvents(draggie);
      this.pckry.push(pckry);
      this.draggies.push(draggie);
    }
  }
}