UPDATE users u
SET first_name = $2,
last_name = $3,
email = $4,
phone_num = $5,
is_email_subscribed = $6,
is_text_subscribed = $7,
user_role = $8
WHERE user_id = $1;

