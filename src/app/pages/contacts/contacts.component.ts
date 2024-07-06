import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../shared/interfaces/contact.interface';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ContactsService } from '../../shared/services/contacts.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../../shared/dialogs/update-dialog/update-dialog.component';
import { debounceTime, distinctUntilChanged, first, Subject, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit, OnDestroy {
  contactsDataArray: Contact[] = [];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();
  columnsToDisplay: string[] = ['firstName', 'lastName', 'phoneNumber', 'update', 'delete', 'viewContact'];
  tableFilter: FormControl = this.formBuilder.control('');
  private readonly componentDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly contactsService: ContactsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.initTable();
    this.subscribeOnFilterInput();
  }

  onUpdate(contact: Contact): void {
    let dialogRef: MatDialogRef<UpdateDialogComponent> = this.dialog.open(UpdateDialogComponent, {
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().pipe(first()).subscribe((result: boolean): void => {
      if (result) {
        this.updateDataSource(this.contactsDataArray);
      }
    });
  }

  onDelete(contact: Contact): void {
    let dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().pipe(first()).subscribe((result: boolean): void => {
      if (result) {
        this.updateDataSource(this.contactsDataArray);
      }
    });
  }

  subscribeOnFilterInput(): void {
    this.tableFilter.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string): void => {
        this.dataSource.filter = value.trim().toLowerCase();

        this.changeDetectorRef.detectChanges();
      }),
      takeUntil(this.componentDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }

  private updateDataSource(dataArray: Contact[]): void {
    this.dataSource = new MatTableDataSource<Contact>(dataArray);

    this.changeDetectorRef.detectChanges();
  }

  private initTable(): void {
    this.contactsDataArray = this.contactsService.contacts;

    this.updateDataSource(this.contactsDataArray);

    this.changeDetectorRef.detectChanges();
  }
}
