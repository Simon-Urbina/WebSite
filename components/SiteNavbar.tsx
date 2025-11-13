'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function SiteNavbar() {
  return (
    <Navbar expand="lg" className="navbar-glass py-2" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <Image src="/logo.svg" alt="Disociando" width={36} height={36} />
          Disociando
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">Inicio</Nav.Link>
            <Nav.Link as={Link} href="/episodes">Episodios</Nav.Link>
            <Nav.Link href="/rss.xml" target="_blank" rel="noopener">RSS</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
