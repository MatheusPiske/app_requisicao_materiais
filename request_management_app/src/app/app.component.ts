import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpAddEditComponent } from './req-add-edit/req-add-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RequestService } from './req-add-edit/services/request.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CoreService } from './core/core.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-root',
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        DatePipe,
        CurrencyPipe,
        MatIcon,
        MatTooltipModule,
    ],
    providers: [DatePipe, CurrencyPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    selectedView = 'almoxarife';
    nameFilterValue = '';
    statusFilter = '';

    getDisplayedColumns() {
        const columns = [
            'RequesterName',
            'ItemDescription',
            'ProductPrice',
            'RequestStatus',
            'createdAt',
        ];
        if (this.selectedView === 'almoxarife') {
            columns.push('action');
        }
        return columns;
    }

    displayedColumns: string[] = this.getDisplayedColumns();
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private _dialog: MatDialog,
        private _reqService: RequestService,
        private _datePipe: DatePipe,
        private _currencyPipe: CurrencyPipe,
        private _coreService: CoreService
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.getRequestList();
        }, 500);
    }

    getIconName(status: string): string {
        switch (status) {
            case 'P':
                return 'warning';
            case 'A':
                return 'check_circle';
            case 'R':
                return 'error';
            default:
                return 'help';
        }
    }

    getInfoTooltip(status: string): string {
        switch (status) {
            case 'P':
                return 'Pendente';
            case 'A':
                return 'Aprovado';
            case 'R':
                return 'Reprovado';
            default:
                return 'help';
        }
    }

    getIconColor(status: string): string {
        switch (status) {
            case 'P':
                return '#ffc107';
            case 'A':
                return '#008000';
            case 'R':
                return '#ff0000';
            default:
                return '#000000';
        }
    }

    onChangeView(event: any) {
        this.selectedView = event.value;
        this.getRequestList();
    }

    onChangeStatus() {
        this.nameFilterValue = '';
    }

    onChangeDescription() {
        this.statusFilter = '';
    }

    openForm() {
        const dialogRef = this._dialog.open(EmpAddEditComponent);
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getRequestList();
                }
            },
        });
    }

    openViewForm(data: any) {
        const dialogRef = this._dialog.open(EmpAddEditComponent, {
            data,
        });

        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getRequestList();
                }
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            const requesterName = data.RequesterName.toLowerCase();
            const itemDescription = data.ItemDescription.toLowerCase();
            return (
                requesterName.includes(filter) ||
                itemDescription.includes(filter)
            );
        };

        this.dataSource.filter = filterValue;

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    applyStatusFilter() {
        this.dataSource.filterPredicate = (data: any, filter: string) => {
            if (filter && filter.toLowerCase() !== 't') {
                return (
                    data.RequestStatus.toLowerCase().indexOf(
                        filter.toLowerCase()
                    ) !== -1
                );
            } else {
                return true;
            }
        };

        this.dataSource.filter = this.statusFilter.toLowerCase();
    }

    formatData(date: string) {
        return this._datePipe.transform(date, 'dd/MM/yyyy');
    }

    formatPrice(price: number) {
        return this._currencyPipe.transform(
            price,
            '$',
            'symbol-narrow',
            '1.2-2'
        );
    }

    getRequestList() {
        this._reqService.getRequestList().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
