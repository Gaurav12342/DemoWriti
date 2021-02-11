import { API_MODULE, BASE_URL } from './common';

const baseURL = BASE_URL[API_MODULE.CUSTOMER];
export const pharmacyPaginate = {
    method: 'POST',
    url: '/admin/pharmacy/paginate',
    baseURL,
  },
  customerPaginate = {
    method: 'POST',
    url: '/admin/clientele/paginate',
    baseURL,
  },
  OrganizationHomePaginate = {
    method: 'POST',
    url: '/admin/org-home/paginate',
    baseURL,
  },
  pharmacyUpsert = {
    method: 'POST',
    url: '/admin/pharmacy',
    baseURL,
  },
  getSpecificPharmacy = {
    method: 'GET',
    url: '/admin/pharmacy',
    baseURL,
  },
  pharmacyUpdate = {
    method: 'PUT',
    url: '/admin/pharmacy',
    baseURL,
  },
  krollHomeHASync = {
    method: 'POST',
    url: '/admin/pharmacy/sync-home-ha-kroll',
    baseURL
  }

export const imagingDiagnosticsPaginate = {
    method: 'POST',
    url: '/admin/imaging-diagnostic/paginate',
    baseURL,
  },
  getSpecificImagingDiagnostics = {
    method: 'GET',
    url: '/admin/imaging-diagnostic',
    baseURL,
  },
  imagingDiagnosticsUpdate = {
    method: 'PUT',
    url: '/admin/imaging-diagnostic',
    baseURL,
  },
  imagingDiagnosticsUpsert = {
    method: 'POST',
    url: '/admin/imaging-diagnostic',
    baseURL,
  },
  UpsertSetting = {
    method: 'PUT',
    url: '/admin/assign-subscription-group/',
    baseURL,
  },
  AddSetting = {
    method: 'POST',
    url: '/admin/setting',
    baseURL,
  },
  getAllHomeArea = {
    method: 'POST',
    url: '/admin/homearea/paginate',
    baseURL,
  };

export const homeOrgPagination = {
    method: 'POST',
    url: '/admin/org-home/paginate',
    baseURL,
  },
  homeOrgUpsert = {
    method: 'POST',
    url: '/admin/org-home',
    baseURL,
  },
  homeOrgUpdate = {
    method: 'PUT',
    url: '/admin/org-home',
    baseURL,
  },
  getSpecificHomeOrg = {
    method: 'GET',
    url: '/admin/org-home',
    baseURL,
  },
  homeOrgUpdateStatus = {
    method: 'PUT',
    url: '/admin/org-home/update-active-status',
    baseURL,
  };

export const homeAreaList = {
    method: 'GET',
    url: '/admin/homearea',
    baseURL,
  },
  homeAreaPaginate = {
    method: 'POST',
    url: '/admin/homearea/paginate',
    baseURL,
  },
  homeAreaUpdate = {
    method: 'PUT',
    url: '/admin/homearea',
    baseURL,
  },
  homeAreaUpsert = {
    method: 'POST',
    url: '/admin/homearea',
    baseURL,
  },
  getSpecificHomeArea = {
    method: 'GET',
    url: '/admin/homearea',
    baseURL,
  },
  homeAreaDelete = {
    method: 'DELETE',
    url: '/admin/homearea',
    baseURL,
  };

// export const subScriptionPaginate = {
//   method: "GET",
//   url: "/admin/org-home",
//   baseURL,
// };
