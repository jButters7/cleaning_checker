CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  phone_num VARCHAR(20) UNIQUE,
  is_email_subscribed BOOLEAN DEFAULT TRUE NOT NULL,
  is_text_subscribed BOOLEAN DEFAULT FALSE NOT NULL,
  password_hash VARCHAR(300) NOT NULL,
  user_role VARCHAR(50) CHECK (user_role IN ('ADMIN', 'TENANT')) NOT NULL DEFAULT 'TENANT'
);

CREATE TABLE apartments(
  apartment_id SERIAL PRIMARY KEY, 
  apartment_num INT UNIQUE NOT NULL
);

CREATE TABLE tenants(
  tenant_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) NOT NULL UNIQUE,
  apartment_id INT REFERENCES apartments(apartment_id) NOT NULL
);

CREATE TABLE check_month(
  check_month_id SERIAL PRIMARY KEY,
  check_month DATE UNIQUE NOT NULL,
  status VARCHAR(100) CHECK (status IN ('INITIAL', 'INPROGRESS', 'COMPLETED', 'ARCHIVED')) NOT NULL DEFAULT 'INITIAL'
);

CREATE TABLE check_dates(
  check_date_id SERIAL PRIMARY KEY,
  check_month_id INT REFERENCES check_month(check_month_id) NOT NULL,
  check_date DATE UNIQUE NOT NULL
);

-- CREATE TABLE apartment_checks(
--   apartment_check_id SERIAL PRIMARY KEY,
--   apartment_id INT REFERENCES apartments(apartment_id) NOT NULL,
--   check_date_id INT REFERENCES check_dates(check_date_id) NOT NULL
--  );

CREATE TABLE tenant_report(
   tenant_report_id SERIAL PRIMARY KEY,
   apartment_id INT REFERENCES apartments(apartment_id) NOT NULL,
   tenant_id INT REFERENCES tenants(tenant_id) NOT NULL,
   check_month_id INT REFERENCES check_month(check_month_id),
   status VARCHAR(100) CHECK (status IN ('INITIAL', 'RECHECK', 'PASS', 'FAIL')) NOT  NULL DEFAULT 'INITIAL',
   failed_info VARCHAR(1000)
);

INSERT INTO apartments
(apartment_num)
VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),
(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),
(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),
(51),(52),(53),(54),(55),(56),(57),(58),(59),(60),
(61),(62),(63),(64);