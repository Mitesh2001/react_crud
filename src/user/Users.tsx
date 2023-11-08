import { FC, useEffect } from 'react';
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { fetchUsers } from '../redux/user/userSlice';
import { Button, Container, Table } from 'react-bootstrap';
import UserActionCell from './UserActionCell';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from "react-icons/lu";
import { User } from '../models/User';

const Users: FC = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state: RootState) => state.user.users);
    const navigate = useNavigate();

    const getAllUsers = async (): Promise<void> => {
        dispatch(fetchUsers())
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <>
            <div className='d-flex justify-content-between my-3'>
                <div className="h3 font-weight-bold">Users</div>
                <Button onClick={() => navigate('/users/create')}> <LuPlus /> New</Button>
            </div>
            <Table responsive="sm" striped className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((user: User, i) =>
                            <>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile_number}</td>
                                    <td><UserActionCell key={user.id} user={user} /></td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    {loading ? "Please wait..." : "No Users Found"}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Users