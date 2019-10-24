-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/8nyfhn
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE Departments (
    dept_no VARCHAR   NOT NULL,
    dept_name VARCHAR   NOT NULL,
    CONSTRAINT pk_Departments PRIMARY KEY (
        dept_no
     )
);

CREATE TABLE dept_emp (
    id INTEGER   NOT NULL,
    dept_no VARCHAR   NOT NULL,
    emp_no INTEGER   NOT NULL,
    from_date VARCHAR   NOT NULL,
    to_date VARCHAR   NOT NULL,
    CONSTRAINT pk_dept_emp PRIMARY KEY (
        id
     )
);

CREATE TABLE dept_manager (
    id INTEGER   NOT NULL,
    dept_no VARCHAR   NOT NULL,
    emp_no VARCHAR   NOT NULL,
    from_date INTEGER   NOT NULL,
    to_date VARCHAR   NOT NULL,
    CONSTRAINT pk_dept_manager PRIMARY KEY (
        id
     )
);

CREATE TABLE Employees (
    emp_no INTEGER   NOT NULL,
    birth_date DATE   NOT NULL,
    first_name VARCHAR   NOT NULL,
    last_name VARCHAR   NOT NULL,
    gender VARCHAR   NOT NULL,
    hire_Date DATE   NOT NULL,
    CONSTRAINT pk_Employees PRIMARY KEY (
        emp_no
     )
);

CREATE TABLE salaries (
    id INTEGER   NOT NULL,
    emp_no INTEGER   NOT NULL,
    salary INTEGER   NOT NULL,
    from_date DATE   NOT NULL,
    to_date DATE   NOT NULL,
    CONSTRAINT pk_salaries PRIMARY KEY (
        id
     )
);

CREATE TABLE titles (
    id INTEGER   NOT NULL,
    emp_no INTEGER   NOT NULL,
    title VARCHAR   NOT NULL,
    from_date DATE   NOT NULL,
    to_Date DATE   NOT NULL,
    CONSTRAINT pk_titles PRIMARY KEY (
        id
     )
);

ALTER TABLE dept_manager ADD CONSTRAINT fk_dept_manager_dept_no_emp_no FOREIGN KEY(dept_no, emp_no)
REFERENCES dept_emp (dept_no, emp_no);

ALTER TABLE salaries ADD CONSTRAINT fk_salaries_emp_no FOREIGN KEY(emp_no)
REFERENCES dept_manager (emp_no);

ALTER TABLE titles ADD CONSTRAINT fk_titles_emp_no FOREIGN KEY(emp_no)
REFERENCES Employees (emp_no);

