import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

const BASE_URL = "http://localhost:3000";

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${BASE_URL}/verify`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    navigate("/login");
                    return;
                }
                setLoading(false);
            } catch (error) {
                console.log("Auth check failed:", error.message);
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate]);

    if (loading) {
        return (
            <Container className='d-flex justify-content-center align-items-center vh-100'>
                <Spinner animation="border" variant="light" />
            </Container>
        );
    }

    return <Outlet />; // this will render all the child routes
};

export default ProtectedRoute;