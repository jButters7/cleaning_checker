INSERT INTO check_dates
(check_month_id, check_date, recheck_date)
VALUES
($1, $2, $3)
RETURNING *;