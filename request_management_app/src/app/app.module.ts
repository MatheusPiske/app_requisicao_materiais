import { NgModule } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [],
    imports: [
        RouterOutlet, 
        MatToolbarModule, 
        MatIconModule, 
        MatButtonModule, 
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
    exports: [
        RouterOutlet, 
        MatToolbarModule, 
        MatIconModule, 
        MatButtonModule, 
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
    providers:[],
    bootstrap: [],
})
export class AppModule {
    constructor(private _dialog: MatDialog) {}

    openForm() {
        this._dialog.open(EmpAddEditComponent);
    }
}