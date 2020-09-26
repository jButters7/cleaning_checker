INSERT INTO users
(first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, password_hash)
VALUES
($1,$2,$3,$4,$5,$6,$7)
RETURNING user_id, first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed;