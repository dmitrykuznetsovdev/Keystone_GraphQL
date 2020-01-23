import React from 'react';
import {Container, Typography} from '@material-ui/core';

const Dashboard = () => (
    <Container>
        <Typography variant="h1">
            Dashboard
        </Typography>
        <p>This is a custom dashboard in the Blog demo project Admin UI.</p>
        <p>
            It demonstrates the ability to change the default dashboard and render a custom page instead.
        </p>
    </Container>
);

export default Dashboard;