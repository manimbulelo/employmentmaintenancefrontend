import React, { useMemo, useEffect, useState } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import StandardLayout from "../components/layout/StandardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7224/Employee/GetAllEmployees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Employee Number", accessor: "employeeNum" },
      { Header: "Employed Date", accessor: "employedDate" },
      { Header: "Terminated Date", accessor: "terminatedDate" },
      { Header: "Last Name", accessor: "person.lastName" },
      { Header: "First Name", accessor: "person.firstName" },
      { Header: "Birth Date", accessor: "person.birthDate" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleEdit(row.original.id)}>
              <FaEdit /> Edit
            </button>
            <button onClick={() => handleDelete(row.original.id)}>
              <FaTrash /> Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: employees });

  const handleEdit = (employeeId) => {
    console.log(`Edit employee with ID ${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    const apiUrl = `https://localhost:7224/Employee/DeleteEmployee`;

    axios
      .post(apiUrl, employeeId)
      .then((result) => {
        console.log(`Employee with ID ${employeeId} deleted successfully`);
        toast.success("Employee deleted successfully");
      })
      .catch((error) => {
        console.error(`Error deleting employee with ID ${employeeId}:`, error);
        toast.error(`Error deleting employee: ${error.message}`);
      });
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  return (
    <div>
      <StandardLayout>
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={handleAddEmployee}
          className="m-[100px] bg-gray-200 saturate-0"
        >
          Add Employee
        </button>
      </StandardLayout>
    </div>
  );
}

export default Employee;
