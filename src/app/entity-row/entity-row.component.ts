import { Component, OnInit, Input } from '@angular/core';
import { Entity } from './../models/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-entity-row',
  templateUrl: './entity-row.component.html',
  styleUrls: ['./entity-row.component.scss']
})
export class EntityRowComponent implements OnInit {

  public form: FormGroup;

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
    console.log("delete");
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

  }

  saveChanges($event: Event): void {
    this.entity = this.form.value;
  }

}
