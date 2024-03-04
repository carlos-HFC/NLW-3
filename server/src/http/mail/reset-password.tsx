import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordProps {
  name: string;
  link: string;
}

export function ResetPassword({ name, link }: Readonly<ResetPasswordProps>) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Atualize sua senha!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Olá {name}</Heading>
          <Text style={text}>
            Recentemente, você solicitou a alteração de senha para sua conta.
          </Text>
          <Text style={text}>
            Para efetuar essa solicitação, clique no botão abaixo e crie uma nova senha
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={link}
            >
              Atualizar senha
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#121212',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '20px 20px 48px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  marginBottom: '20px',
};

const text = {
  color: '#aaaaaa',
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: '16px',
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#12AFCB",
  borderRadius: "16px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "16px",
  border: "none",
  display: "block",
};
