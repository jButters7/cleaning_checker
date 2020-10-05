UPDATE check_month
SET status = 'ARCHIVED'
WHERE check_month_id = $1
RETURNING *;