import Nav from 'react-bootstrap/Nav';

function Navbar() {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home" className='text-white'>Inicio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className='text-white'>Productos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className='text-white'>Sobre Nosotros</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbar;