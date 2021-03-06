import { BellOutlined, HeartOutlined, LogoutOutlined, ProfileOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Col, Dropdown, Input, Menu, Row, Spin, Typography} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import formatprice from '../../common/formatprice';
import { logout } from '../../features/auths/authSlice';
import { getBooks } from '../../graphql-client/query';
import './header.css';
import {HomeFilled, ShopFilled, ScheduleFilled, CustomerServiceFilled, SmileFilled, ReadFilled, TagFilled, PhoneFilled} from '@ant-design/icons';
const { Search } = Input;
interface Props {

}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  

const Header = (props: Props) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    // debugger;
    const dispatch = useDispatch()
    const carts = useSelector((state: any) => state.cart.carts)
    const notifications = useSelector((state: any) => state.notifications.notifications);
    const user = useSelector((state: any) => state.auth.user)
    let total = 0;
    if (carts.length > 0) {
        carts.forEach((cart: any) => {
            total += cart.book.price * cart.quantity
        })
    }
    const [isShowViewSearch, setIsShowViewSearch] = useState(false);
    const [keySearch, setKeySearch] = useState<String>('');
    useEffect(() => {
        if (keySearch === '') {
            setIsShowViewSearch(false);
        }
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [keySearch])
    const inputSearchRef = useRef<any>("");
    const [isLoading, setIsLoading] = useState(false);
    const { data: data1, loading } = useQuery(getBooks)
    if (loading) {
        return <Spin size="large" />
    }
    const handleChageSearch = (e: any) => {
        setIsShowViewSearch(true)
        let timeout: any = null;
        var keyUpEventHandler2 = function (event: any) {
            clearTimeout(timeout);
            setIsLoading(true)
            timeout = setTimeout(async () => {
                const search = inputSearchRef.current.input.value;
                if (search !== '') {
                    setTimeout(() => {
                        setKeySearch(search)
                        setIsLoading(false)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        setKeySearch('')
                        setIsLoading(false)
                    }, 500)
                }
            }, 500);
        }
        inputSearchRef.current.input.addEventListener('keyup', keyUpEventHandler2);
    }

    let dataFilter: any[] = [];
    if (keySearch !== "") {
        dataFilter = data1.books.filter((book: any) => book.name.toLowerCase().includes(keySearch.toLowerCase()))
    }
    const handleClickRemove = () => {
        setKeySearch('');
        setIsLoading(false)
        setIsShowViewSearch(false)
    }
    const handleLogout = () => {
        dispatch(logout({}))
    }
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
                <Link to="user/profile">Xem profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HeartOutlined />}>
                <Link to="/favorite">S??ch y??u th??ch</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                ????ng xu???t
            </Menu.Item>
        </Menu>
    );

    const cartView = (
        <Menu>
            <h4 className="my-2 text-center">Gi??? h??ng c???a b???n</h4>
            <div className="header-scroll">
                {carts.length > 0 ? carts.map((cart: any, index: number) => (
                    <Menu.Item key={index}>
                        <div className="header-product">
                            <div className="header-product-img">
                                <img width="100%" src={cart.book.image} alt="" />
                            </div>
                            <div className="header-product-content">
                                <h6>{cart.book.name}</h6>
                                <p>T??c gi???: {cart.book.author.name}</p>
                            </div>
                            <div className="header-quantity">
                                <p className="text-center m-0">S??? l?????ng</p>
                                <p className="text-center m-0">{cart.quantity}</p>
                            </div>
                            <div className="header-quantity">
                                <p className="text-center m-0">Gi?? ti???n</p>
                                <p className="text-center m-0">{formatprice(cart.book.price)}</p>
                            </div>
                        </div>
                    </Menu.Item>
                )) :
                    <img className="mt-4 mx-auto d-block" width="330" src="https://dcstore.vn/assets/image/empty-cart.png" alt="" />
                }

            </div>
            {carts.length > 0 &&
                <div className="d-flex mx-2 align-items-center justify-content-between">
                    <h5>T???ng ti???n: {formatprice(total)}</h5>
                    <Button>
                        <Link to="/cart" className="m-0">
                            Xem chi ti???t gi??? h??ng
                        </Link>
                    </Button>
                </div>

            }
        </Menu>
    )

    const Notification = (
        <Menu>
            <h4 className="my-2 text-center">Th??ng b??o m???i nh???n</h4>
            <div className="header-scroll">
                {notifications.length > 0 && notifications.map((item: any) => (
                    <Link to="user/history" key={item.order.id} className="notification-item">
                        <img width="80" className='me-2' src="http://hanoimoi.com.vn/Uploads/image/News/Thumbnails/2021/5/Thumbnails25462021044620icon.png" alt="" />
                        <div>{item.message}</div>
                    </Link>
                ))}
            </div>
            <Link to="/user/notifications" className="text-center d-block">Xem chi ti???t</Link>
        </Menu>
    )

    const onSearch = (value: string) => console.log(value);
    const showSearch = () => {
        if (dataFilter.length > 0 && keySearch !== '') {
            return dataFilter.map((book) => (
                <Link onClick={handleClickRemove} to={"/" + book.author.slug + "/" + book.slug} key={book.id} className="showSearch">
                    <div className="search-img">
                        <img width="80" height="100" src={JSON.parse(book.image)[0]} alt="" />
                    </div>
                    <div className="search-content">
                        <h6 className="search-heading">{book.name}</h6>
                        <p className="search-author m-0">T??c gi???: {book.author.name}</p>
                        <p className="search-author">Th??? lo???i: {book.genre}</p>
                    </div>
                </Link>
            ))
        } else {
            return <p className="mt-4">Kh??ng t??m th???y s???n ph???m n??o</p>
        }
    }
    return (
        <div className="header">
            {windowDimensions.width < 800 ?  
                <Row style={{ padding: '20px 40px 0px 40px', alignItems: 'center' }}>
                    <Search
                        placeholder="T??m ki???m"
                        allowClear
                        color='blue'
                        size="large"
                        onSearch={onSearch}
                        onChange={handleChageSearch}
                        ref={inputSearchRef}
                    />
                    {isShowViewSearch ? <div className="viewSearch">
                        <div className="position-search">
                            {isLoading ? <Spin style={{ marginTop: '40px' }} size="large" /> : showSearch()}
                        </div>
                        <div className="viewAllSearch">
                            <Link className="text-center" to="/allbook">Xem t???t c???</Link>
                        </div>
                    </div> : null}
                </Row>
                : null
            }
            <Row style={{ padding: '30px 40px', alignItems: 'center' }}>
                {windowDimensions.width < 800 ? 
                null:
                <Col span={6}>
                    <Search
                        placeholder="T??m ki???m"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        onChange={handleChageSearch}
                        ref={inputSearchRef}
                    />
                    {isShowViewSearch ? <div className="viewSearch">
                        <div className="position-search">
                            {isLoading ? <Spin style={{ marginTop: '40px' }} size="large" /> : showSearch()}
                        </div>
                        <div className="viewAllSearch">
                            <Link className="text-center" to="/allbook">Xem t???t c???</Link>
                        </div>
                    </div> : null}
                </Col>
                }

                <Col span={8}  >
                    <img width="150" src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/12/logo.png" alt="" />
                </Col>

                <Col span={10}>
                    {windowDimensions.width < 1200 ? 
                    <Row style={{ alignItems: 'right' }}>
                        <Col span={7}>
                            <span className="header-in-number">{notifications.length}</span>
                            <Dropdown.Button overlay={Notification} placement="bottomRight" icon={<BellOutlined />}>
                            </Dropdown.Button>
                        </Col>
                        <Col span={9}>
                            <span className="header-quanlity-number">{carts.length}</span>
                            <Dropdown.Button overlay={cartView} placement="bottomRight" icon={<ShoppingOutlined />}>
                            </Dropdown.Button>
                        </Col>
                        <Col span={8}>
                            {user?.name ? <Dropdown.Button style={{ height: '100%' }} overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>   
                            </Dropdown.Button> :
                                <div className="d-flex">
                                    <Button type="primary" style={{ height: '40px' }}>
                                        <Link style={{ color: 'white' }} to="/login">????ng nh???p</Link>
                                    </Button>
                                    <Button type="primary" danger style={{ height: '40px', marginLeft: '10px' }}>
                                        <Link style={{ color: 'white' }} to="/register">????ng k??</Link>
                                    </Button>
                                </div>
                            }

                        </Col>
                    </Row> 
                    : <Row style={{ alignItems: 'right' }}>
                    <Col span={7}>
                        <span className="header-in-number">{notifications.length}</span>
                        <Dropdown.Button overlay={Notification} placement="bottomRight" icon={<BellOutlined />}>
                            <Link to="/user/notifications">
                                Th??ng b??o
                            </Link>
                        </Dropdown.Button>
                    </Col>
                    <Col span={9}>
                        <span className="header-quanlity-number">{carts.length}</span>
                        <Dropdown.Button overlay={cartView} placement="bottomRight" icon={<ShoppingOutlined />}>
                            <Link to="/cart">
                            Gi??? h??ng c???a b???n
                            </Link>
                        </Dropdown.Button>
                    </Col>
                    <Col span={8}>
                        {user?.name ? <Dropdown.Button style={{ height: '100%' }} overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                        {user.name}
                        </Dropdown.Button> :

                            <div className="d-flex">
                                <Button type="primary" style={{ height: '40px' }}>
                                    <Link style={{ color: 'white' }} to="/login">????ng nh???p</Link>
                                </Button>
                                <Button type="primary" danger style={{ height: '40px', marginLeft: '10px' }}>
                                    <Link style={{ color: 'white' }} to="/register">????ng k??</Link>
                                </Button>
                            </div>
                        }

                    </Col>
                    </Row>
                    }
                    
                </Col>
            </Row>
            <Row style={{ backgroundColor: 'black', justifyContent: 'center', padding: "0 40px" }}>
                <Col span={3} className="menu-item">
                    <NavLink to="/" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                             {windowDimensions.width < 1200 ? <HomeFilled />: 'home'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/shop" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <ShopFilled />: 'shop'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/blog" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <ScheduleFilled />: 'BLOG'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/audiobooks" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <CustomerServiceFilled />: 'Audiobooks'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/chilren-books" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <SmileFilled />: 'Chilren???s books'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/usedbooks" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <ReadFilled />: 'Usedbooks'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/about-us" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <TagFilled />: 'About Us'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
                <Col span={3} className="menu-item">
                    <NavLink to="/contact-us" style={{ color: 'white', display: 'block' }}>
                        <Typography.Title style={{ margin: 0, zIndex: 2, color: 'white' }} level={5} >
                        {windowDimensions.width < 1200 ? <PhoneFilled />: 'Contact Us'}
                        </Typography.Title>
                    </NavLink>
                    <span className="spanhover"></span>
                </Col>
            </Row>
        </div>
    )
}

export default Header
