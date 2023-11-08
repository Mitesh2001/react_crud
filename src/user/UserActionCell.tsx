import React, { FC } from 'react'
import { LuTrash, LuPen } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { alertNotification } from '../components/ToastAlert';
import { User } from '../models/User';
import { deleteUser } from '../requests/_requests';
import { AppDispatch, useAppDispatch } from '../redux/store';
import { fetchUsers } from '../redux/user/userSlice';

type UserActionCellProps = {
    user: User
}

const UserActionCell: FC<UserActionCellProps> = ({ user }) => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const handleEditButtonClick = () => {
        navigate(`/users/edit/${user.id}`)
    }

    const handleDeleteButtonClick = async () => {

        Swal.fire({
            title: "Are you sure?",
            icon: 'warning',
            iconColor: "#dc3545",
            showCancelButton: true,
            confirmButtonColor: '#00843d',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!',
            color: "#dc3545"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(user.id);
                    dispatch(fetchUsers())
                    alertNotification("success", "User deleted successfully!", "top-center");
                } catch (error: any) {
                    alertNotification("error", error.message, "top-center");
                }
            }
        })
    }

    return (
        <div className="btn-group" role="group">
            <button type="button" onClick={handleEditButtonClick} className="btn btn-primary">
                <LuPen />
            </button>
            <button type="button" onClick={handleDeleteButtonClick} className="btn btn-danger">
                <LuTrash />
            </button>
        </div>
    )
}

export default UserActionCell