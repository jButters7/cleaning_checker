INSERT INTO check_dates
(check_month_id, check_date)
VALUES
($1, $2)
RETURNING *;