import React from 'react'
import { Row, Col, Typography } from 'antd';
import './footer.css';
interface Props {

}

const Footer = (props: Props) => {
    return (
        <div className="footer">
            <div className="footer-top">
                <Row style={{ width: '1200px', margin: '0 auto' }}>
                    <Col span={12}>
                        <Typography.Title level={3} className="text-footer-h3">
                            LATES TWEETS
                        </Typography.Title>
                        <Row>
                            <Col span={3} >
                                <div className="footer-icon-hover">
                                    <i className="fab fa-twitter"></i>
                                </div>
                            </Col>
                            <Col span={21}>
                                <Typography.Title level={5} className="footer-text-h5">3 junly, 2021</Typography.Title>
                                <Typography.Title level={5} className="footer-text-h5">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est</Typography.Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={3} className="text-footer-h3">
                            STAY CONNECTED
                        </Typography.Title>
                        <div className="footer-list-icon">
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-twitter"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-google-plus-g"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-facebook-f"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-youtube"></i>
                            </div>
                            <div className="footer-list-icon-hover">
                                <i className="fab fa-telegram-plane"></i>
                            </div>

                            <div className="footer-list-icon-hover">
                                <i className="fab fa-instagram"></i>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bootom">
                <Row style={{ width: '1200px', margin: '0 auto' }}>
                    <ul className="listMenu">
                        <li className="list-menu-content">Home</li>
                        <li className="footer-soc"></li>
                        <li className="list-menu-content">Blog</li>
                        <li className="footer-soc"></li>
                        <li className="list-menu-content">New Arrivals</li>
                        <li className="footer-soc"></li>
                        <li className="list-menu-content">Best Seller</li>
                        <li className="footer-soc"></li>
                        <li className="list-menu-content">About Us</li>
                        <li className="footer-soc"></li>
                        <li className="list-menu-content">Contact Us</li>
                    </ul>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            INFORMATION
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>About Us</li>
                            <li>Delivery Information</li>
                            <li> Privacy & Policy</li>
                            <li>Terms & Conditions</li>
                            <li>Manufactures</li>
                        </ul>
                    </Col>

                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            OUR SERVICES
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>Orders Returns</li>
                            <li>Search Terms</li>
                            <li>Advanced Search</li>
                            <li>Affiliates</li>
                            <li>Wholesales</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            MY ACCOUNT
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>My Account</li>
                            <li>My Cart</li>
                            <li>Login</li>
                            <li>Wishlist</li>
                            <li>Perchases</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
                            CONTACT US
                        </Typography.Title>
                        <ul className="footer-content-list">
                            <li>Address: 78 Carpenter Street Huntington, New York 11743</li>
                            <li>Email: contact@example.com</li>
                            <li>Phone: (329) 1833-2302</li>
                            <li>(485) 9127-6014</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer
