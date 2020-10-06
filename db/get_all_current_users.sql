SELECT 
u.user_id,
u.first_name,
u.last_name,
u.email,
u.phone_num,
u.is_email_subscribed,
u.is_text_subscribed,
u.user_role,
t.tenant_id,
t.apartment_id,
a.apartment_num

FROM users u
JOIN tenants t ON t.user_id = u.user_id
JOIN apartments a ON t.apartment_id = a.apartment_id
WHERE u.status = 'CURRENT'
ORDER BY a.apartment_num ASC;