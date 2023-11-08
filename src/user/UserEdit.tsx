import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../requests/_requests';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { alertNotification } from '../components/ToastAlert';
import { LuArrowLeft } from "react-icons/lu";
import { User } from '../models/User';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    email: Yup.string().required('Email is required'),
    mobile_number: Yup.string().required('Mobile Number is required'),
    password: Yup.string()
});

const UserEdit: FC = () => {

    const { userId } = useParams();
    const [initialValues, setInitialValues] = useState<User | {}>({
        name: '',
        email: '',
        mobile_number: '',
        password: '',
    });
    const navigate = useNavigate();

    const fetchUserDetails = async (userId: number) => {
        const user = await getUserById(userId);
        if (user.data) {
            setInitialValues({ ...user.data, password: '' });
        } else {
            alertNotification("warning", "No User Found!", "top-center");
            navigate('/users')
        }
    }

    useEffect(() => {
        userId && fetchUserDetails(parseInt(userId));
    }, [userId])


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values: any, { setSubmitting }) => {
            setSubmitting(true);
            try {
                if (userId) {
                    const response = await updateUser(parseInt(userId), values);
                    if (response.success) {
                        alertNotification("success", "User updated successfully!", "top-center");
                        navigate('/users');
                    } else {
                        alertNotification("error", response.error, "top-center");
                    }
                }
            } catch (error: any) {
                alertNotification("success", error.message, "top-center");
            }
            setSubmitting(false);
        }
    })

    return (
        <>
            <div className='d-flex justify-content-between my-3'>
                <div className="h3 font-weight-bold">Edit User</div>
                <Button onClick={() => navigate('/users')}> <LuArrowLeft /> Back</Button>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" {...formik.getFieldProps("name")} />
                    {
                        formik.touched.name && formik.errors.name && <Form.Text className="text-danger text-sm">
                            {`${formik.errors.name}`}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...formik.getFieldProps("email")} />
                    {
                        formik.touched.email && formik.errors.email && <Form.Text className="text-danger text-sm">
                            {`${formik.errors.email}`}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile Number" {...formik.getFieldProps("mobile_number")} />
                    {
                        formik.touched.mobile_number && formik.errors.mobile_number && <Form.Text className="text-danger text-sm">
                            {`${formik.errors.mobile_number}`}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                    {
                        formik.touched.password && formik.errors.password && <Form.Text className="text-danger text-sm">
                            {`${formik.errors.password}`}
                        </Form.Text>
                    }
                </Form.Group>

                <Button variant="primary" type="submit">
                    {formik.isSubmitting ? "Please wait..." : "Submit"}
                </Button>
            </Form>
        </>
    )
}

export default UserEdit