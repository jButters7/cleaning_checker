SELECT * 
FROM check_month
WHERE check_month BETWEEN to_date($1||'-01-01', 'YYYY-MM-DD') AND to_date($1||'-12-31', 'YYYY-MM-DD');