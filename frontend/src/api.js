const API_BASE_URL = 'http://127.0.0.1:8001';

const getHeaders = (role) => {
  let token = '';
  if (role === 'resident') token = 'mock-Resident';
  if (role === 'operator') token = 'mock-Operator';
  if (role === 'discom') token = 'mock-DISCOM Engineer';

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const fetchResidentToday = async () => {
  const res = await fetch(`${API_BASE_URL}/me/today`, {
    headers: getHeaders('resident')
  });
  if (!res.ok) throw new Error('Failed to fetch resident data');
  return res.json();
};

export const fetchOperatorOverview = async (siteId) => {
  const res = await fetch(`${API_BASE_URL}/sites/${siteId}/overview`, {
    headers: getHeaders('operator')
  });
  if (!res.ok) throw new Error('Failed to fetch operator overview');
  return res.json();
};

export const fetchDiscomFeeders = async () => {
  const res = await fetch(`${API_BASE_URL}/feeders/`, {
    headers: getHeaders('discom')
  });
  if (!res.ok) throw new Error('Failed to fetch discom feeders');
  return res.json();
};

export const fetchAnalytics = async (region = 'mohol') => {
  const res = await fetch(`${API_BASE_URL}/analytics/forecast-and-optimize?region=${region}`, {
    headers: getHeaders('operator')
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
};
