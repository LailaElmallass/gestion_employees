import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    employees: [],
    loading: false,
    error: null,
};

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (newEmployee) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', newEmployee);
    return response.data;
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, updatedEmployee }) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedEmployee);
    return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    return id;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
                state.error = null;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(editEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex((employee) => employee.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter((employee) => employee.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;
