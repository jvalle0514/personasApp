import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'person-edit',
  template: `
    <form [formGroup]="personForm" (ngSubmit)="onPersonFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre" placeholder="Nombre" formControlName="nombre">
      </div>
      <div class="form-group">
        <label for="edad">Edad</label>
        <input type="text" class="form-control" id="edad" placeholder="Edad" formControlName="edad">
      </div>
      <div class="form-group">
        <label for="sexo">Sexo</label>
        <div class="input-group">
          <input type="text" class="form-control" id="sexo" placeholder="Sexo" formControlName="sexo">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;

  @Input() person;
  @Output() savePerson = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      id: '',
      nombre: '',
      edad: '',
      sexo: '',
      documento: ''
    });
  }

  ngOnInit() {
    this.personForm.setValue({
      id: this.person.id || -1,
      nombre: this.person.nombre || '',
      edad: this.person.edad || '',
      sexo: this.person.sexo || '',
      documento: this.person.documento || ''
    });
  }

  onPersonFormSubmit() {
    let dataModel = this.personForm.value;
    this.savePerson.emit(dataModel);
  }
}
