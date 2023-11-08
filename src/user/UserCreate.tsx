import React, { FC } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { alertNotification } from '../components/ToastAlert';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from "react-icons/lu";
import { createUser } from '../requests/_requests';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    email: Yup.string().required('Email is required'),
    mobile_number: Yup.string().required('Mobile Number is required'),
    password: Yup.string().required('Password is required')
});

const UserCreate: FC = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: null,
        email: "",
        mobile_number: "",
        password: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: any, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const response = await createUser(values);
                if (response.success) {
                    alertNotification("success", "User created successfully!", "top-center");
                    navigate('/users');
                } else {
                    alertNotification("error", response.error, "top-center");
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
                <div className="h3 font-weight-bold">New User</div>
                <Button className='align-middle' onClick={() => navigate('/users')}> <LuArrowLeft /> Back</Button>
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

export default UserCreate