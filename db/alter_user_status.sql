UPDATE users
SET status = 'PAST'
WHERE user_id = $1;