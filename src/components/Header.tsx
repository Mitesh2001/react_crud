import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/users')} style={{ cursor: 'pointer' }}>Home</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header