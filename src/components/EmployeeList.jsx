import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchEmployees,addEmployee,
    editEmployee,
    deleteEmployee,
} from '../slices/employeeSlice';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.employees);

    const [newEmployee, setNewEmployee] = useState({ name: '', username: '', email: '' ,phone:''});
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleAddEmployee = () => {
        if (newEmployee.name && newEmployee.username && newEmployee.email) {
            dispatch(addEmployee(newEmployee));
            setNewEmployee({ name: '', username: '', email: '' ,phone:''});
        }
    };

    const handleEditEmployee = () => {
        if (editingEmployee) {
            dispatch(editEmployee({ id: editingEmployee.id, updatedEmployee: editingEmployee }));
            setEditingEmployee(null);
        }
    };

    const handleDeleteEmployee = (id) => {
        dispatch(deleteEmployee(id));
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div>
                <h2 className="text-center">Employee List</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {editingEmployee ? (
                    <div className="mt-4 mb-4">
                        <h4>Edit Employee</h4>
                        <input
                            type="text"
                            value={editingEmployee.name}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                            className="form-control"
                        />
                        <input
                            type="text"
                            value={editingEmployee.username}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, username: e.target.value })}
                            className="form-control mt-2"
                        />
                        <input
                            type="text"
                            value={editingEmployee.email}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                            className="form-control mt-2"
                        />
                        <input
                            type="text"
                            value={editingEmployee.phone}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                            className="form-control mt-2"
                        />
                        <button className="btn btn-success mt-2" onClick={handleEditEmployee}>
                            Save Changes
                        </button>
                    </div>
                ):
                <div className="mt-4 mb-4">
                    <h4>Add Employee</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        className="form-control"
                    />
                    <input
                        type="text"
                        placeholder="username"
                        value={newEmployee.username}
                        onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        className="form-control mt-2"
                    />
                    <input
                        type="text"
                        placeholder="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        className="form-control mt-2"
                    />
                    <input
                        type="text"
                        placeholder="phone"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        className="form-control mt-2"
                    />
                    <button className="btn btn-primary mt-2" onClick={handleAddEmployee}>
                        Add Employee
                    </button>
                </div>
                }

                <h4>Employee List</h4>
                <table className="table table-striped mt-3 table-responsive ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>username</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.username}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone.slice(0,14)}</td>
                                <td >
                                    <button className="btn btn-warning btn-sm mx-3" onClick={() => handleEditClick(employee)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm ml-2 " onClick={() => handleDeleteEmployee(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
};

export default EmployeeList;
