-- Create the database
CREATE DATABASE employee_attendance;

-- Use the database
USE employee_attendance;

-- Employees Table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Logs Table
CREATE TABLE attendance_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    login_time DATETIME,
    logout_time DATETIME,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Make password length longer to accommodate hashed passwords
    role ENUM('admin', 'employee') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fullname VARCHAR(100) NULL, -- Adding fullname field
    reset_token VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL
);

-- Insert initial users
INSERT INTO users (username, password, role, email, fullname)
VALUES ('testuser', 'testpassword', 'admin', 'testuser@example.com', 'Test User');

INSERT INTO users (username, password, role, email, fullname)
VALUES ('employee1', 'password123', 'employee', 'employee1@example.com', 'Employee One');

-- Alter Users Table (update structure and modify password length)
ALTER TABLE users
    MODIFY password VARCHAR(255) NOT NULL;

-- Insert placeholder email for users who don't have it
UPDATE users
SET email = CONCAT('placeholder_', id, '@example.com')
WHERE email IS NULL;

-- Alter Users Table (Ensure email is unique and modify structure)
ALTER TABLE users
    MODIFY email VARCHAR(100) UNIQUE NOT NULL;

-- Leave Requests Table
CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop employee_id column from attendance_logs table if it's no longer needed
ALTER TABLE attendance_logs
    DROP COLUMN employee_id;

