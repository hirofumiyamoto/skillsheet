import React from 'react';
import Head from 'next/head';
import { Amp } from 'react-amphtml';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const defaultHeading = {
  text: 'link1',
};

export default () => (
  <Container>
    <Head>
      <title>link1</title>
    </Head>

    <Amp.State id="heading">{defaultHeading}</Amp.State>
    <Amp.Bind text="heading.text">
      <h1>{defaultHeading.text}</h1>
    </Amp.Bind>
  </Container>
);
