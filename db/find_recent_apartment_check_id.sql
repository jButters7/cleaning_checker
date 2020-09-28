SELECT MAX(apartment_check_id)
FROM apartment_checks
WHERE apartment_id = $1