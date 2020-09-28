SELECT a.apartment_id
FROM apartments a
JOIN tenants t ON a.apartment_id = t.apartment_id
WHERE t.tenant_id = $1;