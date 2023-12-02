import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { addToWishlist } from '../Redux/wishlistSlice';
import axios from 'axios';

function Home() {
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const responseMen = axios.get(`https://fakestoreapi.com/products/category/men's clothing`);
      const responseWomen = axios.get(`https://fakestoreapi.com/products/category/women's clothing`);

      const [menData, womenData] = await Promise.all([responseMen, responseWomen]);

      setAllData([...menData.data, ...womenData.data]);
      setFilteredData([...menData.data, ...womenData.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredProducts = allData.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredProducts);
  };

  const dispatch = useDispatch();
  return (
    <>
        <Row className=' mt-3 d-flex justify-content-start align-item-start'>
        <Col lg={10}>
          <div className="mb-3 w-25 mt-3 form-check">
            <input
              type="text"
              className="form-control"
              placeholder='Search items'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(); 
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-5 mb-5'>
        {
          filteredData?.length > 0 ? filteredData?.map((product, index) => (
            <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
              <Card style={{ width: '18rem', height: '29rem' }} className='ms-4 shadow rounded me-1'>
                <Card.Img height={'200px'} variant="top" src={product?.image} />
                <Card.Body>
                  <Card.Title>{product?.title.slice(0, 15)}...</Card.Title>
                  <Card.Text>
                    <p>{product?.description.slice(0, 55)}...</p>
                    <h5>${product?.price}</h5>
                  </Card.Text>
                  <div className='d-flex justify-content-between'>
                    <Button className='btn btn-light' onClick={() => dispatch(addToWishlist(product))}><i class="fa-solid fa-heart text-danger"></i></Button>
                    <Button className='btn btn-light' onClick={() => dispatch(addToCart(product))}><i class="fa-solid fa-cart-plus text-success"></i></Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

          )) : <p className='text-danger fw-bolder fs-4'>Nothing to Display</p>
        }

      </Row>
    </>
  )
}

export default Home