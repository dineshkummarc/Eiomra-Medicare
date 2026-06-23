-- Eiomra MediCare raw SQL schema
-- Works as a reference schema for MySQL/PostgreSQL-style databases.

CREATE TABLE departments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  floor VARCHAR(80),
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE patients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_code VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(50) NOT NULL,
  gender VARCHAR(30),
  date_of_birth DATE,
  blood_group VARCHAR(10),
  address TEXT,
  emergency_contact VARCHAR(100),
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE doctors (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  staff_code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(50),
  specialty VARCHAR(120) NOT NULL,
  qualification VARCHAR(120),
  consultation_fee DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'available',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_no VARCHAR(60) NOT NULL UNIQUE,
  scheduled_at TIMESTAMP NOT NULL,
  reason VARCHAR(255) NOT NULL,
  type VARCHAR(60) DEFAULT 'consultation',
  status VARCHAR(60) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE medical_records (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  visit_date DATE NOT NULL,
  diagnosis VARCHAR(255) NOT NULL,
  symptoms TEXT,
  treatment_plan TEXT,
  vitals JSON,
  allergies TEXT,
  notes TEXT,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE prescriptions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  prescription_no VARCHAR(60) NOT NULL UNIQUE,
  issued_at DATE NOT NULL,
  medicines JSON NOT NULL,
  instructions TEXT,
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE lab_results (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  test_name VARCHAR(160) NOT NULL,
  sample_no VARCHAR(60) NOT NULL UNIQUE,
  result_summary TEXT,
  result_data JSON,
  status VARCHAR(30) DEFAULT 'pending',
  reported_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE invoices (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  invoice_no VARCHAR(60) NOT NULL UNIQUE,
  subtotal DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  tax DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) DEFAULT 0,
  paid_amount DECIMAL(12,2) DEFAULT 0,
  balance DECIMAL(12,2) DEFAULT 0,
  payment_status VARCHAR(30) DEFAULT 'unpaid',
  due_date DATE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE medications (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sku VARCHAR(60) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(100),
  unit VARCHAR(40) DEFAULT 'box',
  stock_quantity INTEGER DEFAULT 0,
  reorder_level INTEGER DEFAULT 10,
  selling_price DECIMAL(12,2) DEFAULT 0,
  expiry_date DATE,
  status VARCHAR(30) DEFAULT 'available',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE staff_roles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions JSON,
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
