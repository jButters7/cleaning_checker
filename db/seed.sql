CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   first_name VARCHAR(100) NOT NULL,
   last_name VARCHAR(100) NOT NULL,
   email VARCHAR(200) UNIQUE NOT NULL,
   phone_num VARCHAR(20) UNIQUE,
   is_email_subscribed BOOLEAN,
   is_text_subscribed BOOLEAN,
   password_hash VARCHAR(300) NOT NULL,
   user_role VARCHAR(50) CHECK (user_role IN ('ADMIN', 'TENANT')) NOT NULL DEFAULT 'TENANT'
);

-- Added to DB
CREATE TABLE apartments(
   apartment_id SERIAL PRIMARY KEY, 
   apartment_num INT UNIQUE NOT NULL
);

CREATE TABLE apartment_checks(
   apartment_check_id SERIAL PRIMARY KEY,
   apartment_id INT REFERENCES apartments(apartment_id) NOT NULL
 );

CREATE TABLE tenants(
   tenant_id SERIAL PRIMARY KEY,
   user_id INT REFERENCES users(user_id) NOT NULL UNIQUE,
   apartment_id INT REFERENCES apartments(apartment_id) NOT NULL
);

CREATE TABLE check_month(
   check_month_id SERIAL PRIMARY KEY,
   check_month DATE UNIQUE NOT NULL
);

CREATE TABLE check_dates(
   check_date_id SERIAL PRIMARY KEY,
   check_month_id INT REFERENCES check_month(check_month_id) NOT NULL UNIQUE,
   check_date DATE UNIQUE NOT NULL,
   recheck_date DATE UNIQUE NOT NULL
);

CREATE TABLE tenant_checks(
   tenant_check_id SERIAL PRIMARY KEY,
   apartment_check_id INT REFERENCES apartment_checks(apartment_check_id) NOT NULL,
   tenant_id INT REFERENCES tenants(tenant_id) NOT NULL,
   status VARCHAR(100) CHECK (status IN ('INITIAL', 'RECHECK', 'PASS', 'FAIL')) NOT NULL DEFAULT 'INITIAL',
   failed_info VARCHAR(1000) NOT NULL
);