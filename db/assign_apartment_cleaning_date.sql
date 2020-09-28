INSERT INTO apartment_checks
(apartment_id, check_date_id)
VALUES
($1,$2)
RETURNING apartment_check_id;