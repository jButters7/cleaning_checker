UPDATE tenant_report
SET
status = $2,
failed_info = $3
WHERE tenant_check_id = $1