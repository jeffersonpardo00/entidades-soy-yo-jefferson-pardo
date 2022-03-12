import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from './../models/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-entity-row',
  templateUrl: './entity-row.component.html',
  styleUrls: ['./entity-row.component.scss']
})
export class EntityRowComponent implements OnInit {

  public form: FormGroup;
  public isEditing: boolean = false;

  @Input() entity: Entity={
    entityId:0,
    name:"-",
    identificationNumber:0,
    expirationDate: "-",
    contactName:"-",
    contactMail:"-",
    ipAddress:"-",
    logo:"-"
  };

  @Output() editClicked: EventEmitter<Entity> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.form = this.formBuilder.group({
      entityId:[0],
      name:[''],
      identificationNumber:[0],
      expirationDate: [''],
      contactName:[''],
      contactMail:[''],
      ipAddress:[''],
      logo:['']
    });

   }

  ngOnInit(): void {
  }

  delete():void{
    this.deleteClicked.emit(this.entity.entityId);
    //console.log("delete");
  }

  edit():void{
    /*this.entity={
      entityId:0,
      name:"-",
      identificationNumber:0,
      expirationDate: "-",
      contactName:"-",
      contactMail:"-",
      ipAddress:"-",
      logo:"-"
    };*/

    this.form = this.formBuilder.group(this.entity);
    this.isEditing = true;
  }

  saveChanges($event: Event): void {
    this.entity = this.form.value;
    this.isEditing = false;
    this.editClicked.emit(this.entity);
  }

}
