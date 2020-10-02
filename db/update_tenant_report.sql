UPDATE tenant_report
SET
status = $2,
failed_info = $3
WHERE tenant_report_id = $1