import React from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';

import { Title } from './styles.js'
import { Container, Paper } from '@material-ui/core'

export default () => (
    <Container>
        <Paper>
            <Title>My First Next.js Page</Title>
        </Paper>
        <Paper>
            <Query query={gql`
                  {
                    allUsers {
                        name
                        email
                        id
                    }
                  }
                `}>
                {({ data, loading, error }) => {
                    if (loading) return <p>loading...</p>;
                    if (error) return <p>Error!</p>;

                    return <div>{data.allUsers.map((user) => <b key={user.id}>{user.email}</b> )}</div>;
                }}
            </Query>
        </Paper>
    </Container>
)