import React, { useState } from "react";
import axios from "axios";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Employee = {
  employeeNum: "",
  employedDate: new Date(),
  terminatedDate: new Date(),
  person: {
    lastName: "",
    firstName: "",
    birthDate: new Date(),
  },
};

function AddEmployee(props) {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(Employee);
  const apiUrl = "https://localhost:7224/Employee/CreateEmployee";

  const addNewEmployee = (e) => {
    e.preventDefault();
    const data = {
      EmployeeNum: employee.employeeNum,
      Person: {
        LastName: employee.person.lastName,
        FirstName: employee.person.firstName,
        BirthDate:
          employee.person.birthDate instanceof Date
            ? employee.person.birthDate.toISOString()
            : null,
      },
      EmployedDate: employee.employedDate,
      TerminatedDate: employee.terminatedDate,
    };

    axios.post(apiUrl, data).then((result) => {
      navigate("/employees");
    });
  };

  const onChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [e.target.name]: e.target.value,
    }));
  };

  const onPersonChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      person: {
        ...prevEmployee.person,
        [name]: value,
      },
    }));
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Form onSubmit={addNewEmployee}>
          <FormGroup>
            <Label for="employeeNum">Employee Number</Label>
            <Input
              type="text"
              name="employeeNum"
              id="employeeNum"
              placeholder="Enter employee number"
              value={employee.employeeNum}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={employee.person.lastName}
              onChange={onPersonChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={employee.person.firstName}
              onChange={onPersonChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">Birth Date</Label>
            <DatePicker
              selected={employee.person.birthDate}
              onChange={(date) => onPersonChange("birthDate", date)}
              dateFormat="yyyy-MM-dd"
            />
          </FormGroup>
          <Button type="submit">Add Employee</Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddEmployee;
