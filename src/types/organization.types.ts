export interface OrganizationRequest {
  name: string;
  domain: string;
  industry: string;
  employees_count: string;
  country: string;
  currency: string;
  is_vat_registered: boolean;
}

export interface OrganizationResponse {
  message: string;
  domain: string;
  tenant_id: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
}

export interface Organization {
  name: string;
  domain: string;
  image: string;
}

export interface UserOrganizationsResponse {
  user: User;
  organizations: Organization[];
}
