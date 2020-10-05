select * from check_dates cd
JOIN check_month cm ON cm.check_month_id = cd.check_month_id
WHERE cm.status = 'INITIAL'
ORDER BY cd.check_date ASC;