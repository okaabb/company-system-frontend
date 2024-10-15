export interface ApplicantComponentModel {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
}

export interface ApplicantPaginatedResponse {
  content: ApplicantComponentModel[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
