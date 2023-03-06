import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
//===Import apiservices from Services====
import { ApiService } from './services/api.service';
// ====Import xcel library from AppModule.ts===
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'json-excel';
  // ===Array for Storing the values which get from database by get request===
  valueFromForm:any =[];
  //====Array for Storing the DropdownKeys which get from database by get request===
  dropDowns:any = [];
  fileName= 'ExcelSheet.xlsx';
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder,private api:ApiService){}
  ngOnInit(): void {

      this.form = this.formBuilder.group({
      
        email:['',Validators.required],
        password:['',Validators.required],
        date:['',Validators.required],
        model:['',Validators.required],
      })
    
  }

  //Function to get dropdown keys

  Dropdownkeys(){
this.api.getDropdownKeys().subscribe((res)=>{
  this.dropDowns = res;
})

//Function which execute while clicking submit button(post request)
  }
  Onsubmit(){
    // console.log(this.form.value)
    this.api.postValues(this.form.value)
    .subscribe({
      next:(res)=>{
        alert('Form submitted succesfully💯')
      },
      error:()=>{
        alert('Something went wrong')
      }
    })
  }

  //Function to get form values keys
  getFormValues(){
    this.api.getValues().subscribe({
      next:(res)=>{
        this.valueFromForm = res
        console.log(this.valueFromForm)
      },
      error:()=>{
        alert('Error while fetching data')
      }
    })
  }


//Function for converting table data to excel
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
}
  




