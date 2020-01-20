import React from 'react';
import {Container, Typography} from '@material-ui/core';

const About = () => (
    <Container>
        <Typography variant="h1">
            About
        </Typography>
        <p>This is a custom page in the Blog demo project Admin UI.</p>
        <p>
            It demonstrates the ability to add navigation routes that render custom React components, and
            use the KeystoneJS Design System.
        </p>
    </Container>
);

export default About;