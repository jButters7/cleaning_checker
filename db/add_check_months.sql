INSERT INTO check_month
(check_month)
VALUES
(to_date( $1 || '-' || $2 || '-01', 'YYYY-MM-DD'))
RETURNING *;