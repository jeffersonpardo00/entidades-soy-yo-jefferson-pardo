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

  entities : Entity[] = [];

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

}
