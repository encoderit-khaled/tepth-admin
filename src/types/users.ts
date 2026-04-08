
export type GetAllOfficersDropdownParams = {
  enabled?: boolean;
  refetchOnMount?: boolean;
  role?: string;
  is_active?: number | boolean;
  employee_type?: string;
  officer_type?: string;
  service_id?: number;
  service_area_id?: number;
  available_officer?: "yes" | "no";
  search?: string;
};
