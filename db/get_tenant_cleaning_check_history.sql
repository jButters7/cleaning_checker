SELECT 
u.first_name,
u.last_name,
tr.tenant_report_id,
t.tenant_id,
tr.status,
tr.failed_info,
cm.check_month_id,
cm.check_month,
cd.check_date_id,
cd.check_date
FROM tenant_report tr
JOIN check_month cm ON cm.check_month_id = tr.check_month_id
JOIN check_dates cd ON cd.check_month_id = cm.check_month_id
JOIN tenants t ON t.tenant_id = tr.tenant_id
JOIN users u ON u.user_id = t.user_id
WHERE u.user_id = $1
ORDER BY cm.check_month DESC;