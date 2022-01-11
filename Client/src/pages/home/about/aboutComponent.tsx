import { useQuery } from '@apollo/client';
import { Col, Row, Spin, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import formatprice from '../../../common/formatprice';
import { getBooks } from '../../../graphql-client/query';
import './about.css';
interface Props {

}

const AboutComponent = (props: Props) => {
    const { loading, error, data } = useQuery(getBooks)
    console.log(data);

    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    const productPage = [];
    if(data?.books){
        for (let i = 0; i < 4; i++) {
            productPage.push(data.books[i])
        }
    }
    console.log(productPage);
    
    return (
        <div className="about">
            <div className="image-about">
                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/12/banner1.jpg" alt="" />
            </div>
            <Row className="about-content">
                <Col span={8}>
                    <Typography.Title level={4}>
                        AUTHOR BEST SELLING
                    </Typography.Title>
                    <Typography.Title level={1} className="about-h1" style={{ color: '#F07C29', margin: 0, fontSize: 64, fontWeight: 'bold' }}>
                        J. K.
                    </Typography.Title>
                    <Typography.Title level={1} className="about-h1" style={{ color: '#F07C29', margin: 0, fontSize: 64, fontWeight: 'bold' }}>
                        Rowling
                    </Typography.Title>
                    <Typography.Title className="about-h1" style={{ color: '#999999', margin: '30px 0', fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>
                        CATEGORIES: BOOKS, AUDIOBOOKS
                    </Typography.Title>
                    <Typography.Title className="about-h1" style={{ color: '#999999', marginRight: 0, marginLeft: 'auto', marginBottom: '40px', fontSize: 16, fontWeight: 'bold', textAlign: 'right', width: 400 }}>
                        Vestibulum porttitor iaculis gravida. 
                        Praesent vestibulum varius placerat. 
                        Cras tempor congue neque, id aliquam
                        orci finibus sit amet. Fusce at facilisis arcu. 
                        Donec aliquet nulla id
                        turpis semper, a bibendum metus vulputate.
                        Suspendisse potenti.
                        Facebook-f
                        Twitter
                    </Typography.Title>
                    <div className="icon-about">
                        <div></div>
                        <div className="icon-list">
                            <span className="icon-item"><i className="fab fa-facebook-f"></i></span>
                            <span className="icon-item"><i className="fab fa-twitter"></i></span>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="image">
                        <div className="image-hover">
                            <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/12/banner2.jpg" alt="" />
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <Row>
                        {productPage.length > 0 && productPage.map((book) => (
                            <Col key={book.id} span={12} style={{boxSizing: 'border-box'}}>
                                <Link to={book.author.slug + "/" + book.slug} className="mx-2">
                                    <img width="150" height="220" src={JSON.parse(book.image)} alt="" />
                                    <Typography.Title level={5} style={{margin: 0}}>
                                        {book.name}
                                    </Typography.Title>
                                    <Typography.Title level={4} style={{margin: 0}}>
                                        {formatprice(book.price)}
                                    </Typography.Title>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AboutComponent
