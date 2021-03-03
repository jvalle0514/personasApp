import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'people-list',
    template:
    `
        <table class="table table-striped">
            <thead>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Documento</th>
            </thead>
            <tbody>
                <tr *ngFor="let p of people">
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.edad }}</td>
                    <td>{{ p.sexo }}</td>
                    <td></td>
                    
                </tr>
            </tbody>
        </table>
        
        <button class="btn btn-primary" (click)="addPerson.emit()">Agregar</button>        
    `
})

export class PeopleListComponent {
    @Input() people;
    @Output() addPerson = new EventEmitter<any>();
    @Output() editPerson = new EventEmitter<any>();
}