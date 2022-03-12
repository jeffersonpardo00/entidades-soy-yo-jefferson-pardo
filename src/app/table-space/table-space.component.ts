import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { EntityListService } from './../services/entity-list.service';
import { Entity } from './../models/entity';

@Component({
  selector: 'app-table-space',
  templateUrl: './table-space.component.html',
  styleUrls: ['./table-space.component.scss']
})
export class TableSpaceComponent implements OnInit, OnChanges {
  
  @Input() ListID: string[] = [];

  public entities : Entity[] = [];

  private nameToggleStatus: string = "DES";
  private dateToggleStatus: string = "DES";


  constructor(
    private entityListService : EntityListService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    //  console.log(this.ListID)
    this.getEntityList();
    // console.log(this.entities);
  }

  getEntityList(): void{
    
    let list:Entity[] = [];
     for(let value of this.ListID){
      this.entityListService.getEntity(value.toString())
       .subscribe (entity => {
         const entityAux: Entity = entity.data
         list.push(entityAux);
       });
     }
     
     this.entities = list;

   }

  deleteRow(event:number): void{
    //console.log(`delete ${event}`);
    const listAux = this.entities.filter((entity) => entity.entityId !== event);
    this.entities = listAux;
    //console.log(this.entities);
  }

  saveEditedRow(event:Entity): void{
    //console.log( event);
    const listAux = this.entities.map((entity) => 
    {
      if(entity.entityId == event.entityId){
          return event;
      }else{
        return entity;
      }
    });

    this.entities = listAux;
    console.log(this.entities);
  }

  orderNameToggle(event:any): void{
    console.log( event.target);
    switch(this.nameToggleStatus){
      case "DES":
        this.entities.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        });
        this.nameToggleStatus = "ASC";
        event.target.innerHTML = "ASC";
      break;
      case "ASC":
        this.entities.sort(function(a, b){
          if(a.name < b.name) { return 1; }
          if(a.name > b.name) { return -1; }
          return 0;
        });
        this.nameToggleStatus = "DES";
        event.target.innerHTML = "DES";
      break;
    }
    
  }

  orderDateToggle(event:any): void{
    console.log(event);
  switch(this.dateToggleStatus){
    case "DES":
      this.entities.sort(function(a, b){
        if(a.expirationDate < b.expirationDate) { return -1; }
        if(a.expirationDate > b.expirationDate) { return 1; }
        return 0;
      });
      this.dateToggleStatus = "ASC";
      event.target.innerHTML = "ASC";
    break;
    case "ASC":
      this.entities.sort(function(a, b){
        if(a.expirationDate < b.expirationDate) { return 1; }
        if(a.expirationDate > b.expirationDate) { return -1; }
        return 0;
      });
      this.dateToggleStatus = "DES";
      event.target.innerHTML = "DES";
    break;
  }

    
  }


}
