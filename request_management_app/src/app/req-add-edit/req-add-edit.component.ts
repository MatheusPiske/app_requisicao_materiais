import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from '../core/core.service';

@Component({
    selector: 'app-req-add-edit',
    standalone: true,
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
        NgxCurrencyDirective,
        HttpClientModule,
        CommonModule,
        MatSnackBarModule,
    ],
    templateUrl: './req-add-edit.component.html',
    styleUrl: './req-add-edit.component.css',
})
export class EmpAddEditComponent implements OnInit {
    reqForm!: FormGroup;
    sendRequestID!: any;

    constructor(
        private _fb: FormBuilder,
        private _reqService: RequestService,
        private _dialogRef: MatDialogRef<EmpAddEditComponent>,
        private _coreService: CoreService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.reqForm = this._fb.group({
            RequestID: this.sendRequestID,
            RequesterName: '',
            ItemDescription: '',
            ProductPrice: '',
            Quantity: 1,
            RequestStatus: 'P',
            InclusionDate: new Date().toISOString().slice(0, 10),
            StatusDescription: '',
        });
    }

    ngOnInit(): void {
        this.reqForm.patchValue(this.data);
        this.getLastRequisition();
    }

    getStatusDescription(data: boolean): any {
        if (!data) {
            return {
                display: 'none',
            };
        }
    }

    onFormSubmit() {
        if (this.reqForm.valid) {
            const selectedStatus = this.reqForm.get('RequestStatus')?.value;
            const statusDescription =
                this.reqForm.get('StatusDescription')?.value;

            if (
                ['P', 'A', 'R'].includes(selectedStatus) &&
                (selectedStatus !== 'R' || statusDescription !== '')
            ) {
                if (this.data) {
                    this._reqService
                        .updateRequest(this.data.RequestID, this.reqForm.value)
                        .subscribe({
                            next: (val: any) => {
                                this._coreService.openSnackBar(
                                    'Requisição atualizada com sucesso!'
                                );
                                this._dialogRef.close(true);
                            },
                            error: (err: any) => {
                                console.log(err);
                            },
                        });
                } else {
                    this._reqService.addRequest(this.reqForm.value).subscribe({
                        next: (val: any) => {
                            this._coreService.openSnackBar(
                                'Requisição criada com sucesso!'
                            );
                            this._dialogRef.close(true);
                        },
                        error: (err: any) => {
                            console.log(err);
                        },
                    });
                }
            } else if (selectedStatus === 'R' && statusDescription === '') {
                this._coreService.openSnackBar(
                    'Descrição não pode ser vazia para tipo Reprovado!'
                );
            } else {
                this._coreService.openSnackBar('Status inválido');
            }
        }
    }

    getLastRequisition() {
        this._reqService.getLastRequisition().subscribe({
            next: (res) => {
                this.sendRequestID = res.RequestID;
                this.sendRequestID++;
            },
            error: (err) => {
                this.sendRequestID = 0;
            },
        });
    }

    currencyInput: number = 0;
}
