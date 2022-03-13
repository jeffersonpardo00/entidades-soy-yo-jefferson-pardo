import { Component, OnInit } from '@angular/core';


import { EntityListService } from './../services/entity-list.service';
import { EntityPrev } from './../models/entity-prev';
//import { Entity } from './../models/entity';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  public entityPrevList: EntityPrev[] = [];
  public tableHiden: boolean = true;
  public displayError: boolean = false;
  public messageError: string[] = [];
  
  public listID: string[] = [];

  constructor(
    private entityListService : EntityListService,
    private fb: FormBuilder
  ) { 

    this.form = this.fb.group({
      selectedEntities:  new Array([])
     });
  }

  ngOnInit(): void {
   // let list = this.entityListService.getEntityList();
   this.getEntityPrevList();
    
  }

  onCheckboxChange(event: any) {
    
    // console.log(this.form.value.selectedEntities);

    const selectedEntities = (this.form.value.selectedEntities as Array<string>);
    if (event.target.checked) {
      // console.log(event.target.value);
      selectedEntities.push(event.target.value);
    } else {
     // console.log(selectedEntities.indexOf( event.target.value ));
      selectedEntities.splice( selectedEntities.indexOf( event.target.value ),1 );
    }

  }

  getEntityPrevList(): void {

      let list:EntityPrev[] = [];
    
      for(let  x=1; x<=10; x++){
       this.entityListService.getEntity(x.toString())
       .pipe(
        catchError(err => {
          console.log('error', err);
          return throwError(err);
        })
      )
        .subscribe (entity => {

          if(entity.type === "success"){

            if( Object.keys(entity.data).length === 0 ){
              console.log(`error: ${entity.message}, code: ${entity.code}, traceId: ${entity.traceId}`);
              this.messageError.push(`error: ${entity.message}, code: ${entity.code}, traceId: ${entity.traceId}`);
              this.displayError = true;
            }else{
              const entityAux: EntityPrev = 
              {
              entityId: entity.data.entityId,
              name:entity.data.name
              }
              ;
              //console.log(entityAux);
              list.push(entityAux);
            }

         }else{
          console.log(`error: ${entity.message}, code: ${entity.code}, traceId: ${entity.traceId}`);
          this.messageError.push(`error: ${entity.message}, code: ${entity.code}, traceId: ${entity.traceId}`);
          this.displayError = true;
        }
      });

    }
      this.entityPrevList = list;
  
   

   }

  submit(): void {
    this.listID = this.form.value.selectedEntities;
    this.tableHiden = false;
  }

  reset(): void {
    this.tableHiden = true;
    this.listID = [];
    this.entityPrevList = [];
    this.form = this.fb.group({
      selectedEntities:  new Array([])
     });
    this.messageError = [];
    this.displayError = false;
    this.getEntityPrevList();


  }

}
