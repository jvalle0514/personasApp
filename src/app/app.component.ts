//our root app component
import { Component, ViewChild } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { HttpClient } from "@angular/common/http";



@Component({
	selector: 'app-root',
	template:
	`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
		<div id="container">
			<my-tabs>
				<my-tab [tabTitle]="'PersonasApp'">
					<h3>Lista de Personas</h3>
					<people-list
						[people]="people"
						(addPerson)="onAddPerson()"
						(editPerson)="onEditPerson($event)">
					</people-list>
				</my-tab>
			</my-tabs>
			
			<ng-template let-person="person" #personEdit>
				<person-edit [person]="person" (savePerson)="onPersonFormSubmit($event)"></person-edit>
			</ng-template>

		</div>
	`
})

export class AppComponent {
	@ViewChild('personEdit') editPersonTemplate;
	@ViewChild('about') aboutTemplate;
	@ViewChild(TabsComponent) tabsComponent;

	constructor(private http: HttpClient){
		this.getUsers();
	}

	people:any = [
		{
			id: '',
			nombre: '',
			edad: '',
			sexo: ''
		}
	];

	getUsers(){
		this.http.get('https://randomapi.com/api/5rok9q2c?key=7YG2-0PPR-CZS0-1AUK').subscribe(data => {
			this.people = data['results']
		});
	}

	onEditPerson(person) {
		this.tabsComponent.openTab(`Editar:  ${person.nombre}  ` , this.editPersonTemplate, person, true);
	}

	onAddPerson() {
		this.tabsComponent.openTab('Agregar Persona', this.editPersonTemplate, {}, true);
	}

	onPersonFormSubmit(dataModel) {
		if (dataModel.id > 0) {
			this.people = this.people.map(person => {
				if (person.id === dataModel.id) {
					return dataModel;
				} else {
					return person;
				}
			});
		} else {
			// create a new one
			dataModel.id = Math.round(Math.random() * 100);
			this.people.push(dataModel);
		}
		
		// close the tab
		this.tabsComponent.closeActiveTab();
	}
	
	
}

