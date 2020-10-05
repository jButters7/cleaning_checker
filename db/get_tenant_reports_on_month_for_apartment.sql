select 
u.first_name,
u.last_name,
t.tenant_id,
tr.tenant_report_id,
t.apartment_id,
tr.status,
tr.failed_info
from tenant_report tr
JOIN tenants t ON tr.tenant_id = t.tenant_id
JOIN users u ON t.user_id = u.user_id
WHERE tr.check_month_id = $1 AND tr.apartment_id = $2
ORDER BY tr.tenant_id ASC;