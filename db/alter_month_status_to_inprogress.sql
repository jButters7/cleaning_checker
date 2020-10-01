UPDATE check_month
SET status = 'INPROGRESS'
WHERE check_month_id = $1;