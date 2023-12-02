import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const wishlist = useSelector((state)=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)

  return (
    <Navbar expand="lg" className="bg-secondary fixed">
      <Container>
        <Navbar.Brand> <Link to={'/'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontw
            :'bold'}}><i class="fa-solid fa-shirt me-3"></i>TeeRex TShirt</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='btn btn border rounded'>
                <Link to={'/wishlist'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontw
            :'bold'}}>
                <i className='fa-solid fa-heart text-danger me-2'></i>WishList
                <Badge className='ms-2 rounded' bg='light'>{wishlist.length}</Badge></Link>
            
            </Nav.Link>
            <Nav.Link className='btn btn border rounded ms-2'>
                <Link to={'/cart'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white',fontw
            :'bold'}}>
                <i className='fa-solid fa-cart-shopping text-danger me-2'></i>Cart
                <Badge className='ms-2 rounded' bg='light'>{cart.length}</Badge></Link>
            
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;