import React from 'react'
import { Row,Col,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../Redux/cartSlice'
import { removeFromWishlist } from '../Redux/wishlistSlice'
// import {wishlistReducer} from '../Redux/store'

function Wishlist() {
  const wishlistArray = useSelector((state) => state.wishlistReducer)
  const dispatch = useDispatch()
  const handleWishlistCart = (product)=>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product.id))
  }
  return (
    <div style={{ marginTop: '30px' }}>
      <Row className='m-5'>
        {
          wishlistArray?.length>0?
            wishlistArray.map((product, index) => (
              <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                <Card style={{ width: '18rem', height: '29rem' }} className='ms-5 shadow rounded'>
                  <Card.Img height={'200px'} variant="top" src={product?.thumbnail} />
                  <Card.Body>
                    <Card.Title>{product?.title}</Card.Title>
                    <Card.Text>
                      <p>{product?.description.slice(0, 55)}...</p>
                      <h5>${product?.price}</h5>
                    </Card.Text>
                    <div className='d-flex justify-content-between'>
                      <Button className='btn btn-light' onClick={()=>dispatch(removeFromWishlist(product.id))}><i class="fa-solid fa-trash text-danger"></i></Button>
                      <Button className='btn btn-light' onClick={()=>handleWishlistCart(product)}><i class="fa-solid fa-cart-plus text-success"></i></Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )):<div style={{height:'60vh'}} className='w-100 d-flex flex-column justify-content-center align-items-center'>
              <img height={'250'} src="https://media.tenor.com/Ps_yzYNtcpEAAAAd/throw-garbage.gif" />
              <h3 className='fw-border'> Your Wishlist is Empty !!!!</h3>
              <Link style={{textDecoration:'none'}} className='btn btn-success rounded mt-3' to={'/'}>Back To Home</Link>
            </div>
          }
      </Row>
    </div>
  )
}

export default Wishlist