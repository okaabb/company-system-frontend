import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ApplicantComponentModel, ApplicantPaginatedResponse} from "../../models/applicant.model";
import {ApplicantService} from "../../services/applicant.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-list-applicant',
  templateUrl: './list-applicant.component.html',
  styleUrls: ['./list-applicant.component.css']
})
export class ListApplicantComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile number', 'actions'];
  dataSource = new MatTableDataSource<ApplicantComponentModel>();
  totalRecords: bigint | number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  error = signal('');
  currentFilterColumn: string = 'id';
  map = new Map<string, string>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private applicantService: ApplicantService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadApplicants(this.pageIndex, this.pageSize);
    this.dataSource.paginator = this.paginator;
  }

  loadApplicants(pageIndex: number, pageSize: number): void {
    this.applicantService.getAllApplicants(pageIndex, pageSize).subscribe({
      next: (resData: HttpResponse<ApplicantPaginatedResponse>) => {
        this.dataSource.data = resData.body?.content || [];
        this.totalRecords = resData.body?.totalElements || 0;
        this.dataSource.paginator = this.paginator;
      }, error: (error: Error) => {
        this.error.set(error.message);
      },
    });
  }

  onPaginateChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadApplicants(this.pageIndex, this.pageSize);
  }

  addApplicant() {
    this.router.navigate(['/applicants/add']);
  }

  editApplicant(id: number): void {
    this.router.navigate(['/applicants/edit', id]);
  }

  deleteApplicant(id: number): void {
    this.router.navigate(['/applicants/remove', id]);
  }

  viewApplicantDetails(row: any): void {
    this.router.navigate(['/applicants/', row.id]);
  }

  filterByColumn(event: Event, column: string): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();

    this.currentFilterColumn = column;

    this.map.set(this.currentFilterColumn, filterValue);

    this.applicantService.filterApplicants(this.map, this.pageIndex, this.pageSize).subscribe({
      next: (resData: HttpResponse<ApplicantPaginatedResponse>) => {
        this.dataSource.data = resData.body?.content || [];
        this.totalRecords = resData.body?.totalElements || 0;
        this.dataSource.paginator = this.paginator;
      }, error: (error: Error) => {
        this.error.set(error.message);
      },
    });

  }
}
