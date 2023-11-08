import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Users from '../user/Users';
import UserCreate from '../user/UserCreate';
import UserEdit from '../user/UserEdit';
import { Container } from 'react-bootstrap';

const PublicRoutes: FC = () => {
    return (
        <>
            <Container>
                <Routes>
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/create' element={<UserCreate />} />
                    <Route path='/users/edit/:userId' element={<UserEdit />} />
                    <Route path='*' element={<Navigate to={'/users'} />} />
                </Routes>
            </Container>
        </>
    )
}

export default PublicRoutes;