import { useQuery } from '@apollo/client';
import { Button, Card, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import formatprice from '../../common/formatprice';
import { toastDefault } from '../../common/toast';
import { addToCart } from '../../features/cart/cartSlide';
import { getBooks, getSingleBook } from '../../graphql-client/query';
import './productDetail.css';
interface Props {

}

const ProductDetail = (props: Props) => {
    const { slugProduct } = useParams()
    const dispatch = useDispatch()
    const [count, setCount] = useState(1)
    const [imageFocus, setImageFocus] = useState<any>('')
    const { loading, error, data } = useQuery(getSingleBook, {
        variables: {
            slug: slugProduct,
        }
    })
    const { loading: loading1, error: error1, data: data1 } = useQuery(getBooks)
    if (loading || loading1) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    console.log(data);
    const handleChange = (e: any) => {
        setCount(e.target.value)
    }
    const handleClickTang = () => {
        setCount((Number(count)) + 1)
    }

    const handleClickGiam = () => {
        if (count > 1) {
            setCount((Number(count)) - 1)
        } else {
            setCount(1)
        }
    }

    const bookTopQuery: any[] = [];
    if (data1?.books) {
        for (let i = 0; i < 4; i++) {
            bookTopQuery.push(data1.books[i])
        }
    }
    let images = [];
    if (data.book) {
        images = JSON.parse(data.book.image)
    }
    const addImageFocus = (image: String) => {
        setImageFocus(image)
    }
    let dataBookQuery = [];
    if (data?.book?.author?.books) {
        dataBookQuery = data.book.author.books.filter((book: any) => book.id !== data.book.id)
    }
    console.log("dataBookQuery",dataBookQuery);
    
    const handleClickAdd = () => {
        const cart = {
            quantity: Number(count),
            book: {
                slug: data.book.slug,
                name: data.book.name,
                id: data.book.id,
                price: data.book.price,
                author: {
                    name: data.book.author.name,
                    slug: data.book.author.slug
                },
                image: JSON.parse(data.book.image)[0]
            }
        }
        dispatch(addToCart(cart))
        setCount(1)
        toastDefault("Thêm sách vào giỏ hàng thành công")
    }

    return (
        <div>
            <div className="container-fuild header-bottom">
                <div className="container">
                    <div className="d-flex justify-content-between aligns-items-center">
                        <div className="header-product-text py-2">
                            <h1 className="page-header-title clr" style={{ color: 'black', marginBottom: 0 }} itemProp="headline">
                                {data.book.name}
                            </h1>
                        </div>
                        <div className="d-flex header-product-a" style={{ marginTop: "10px" }}>
                            <div className="pe-1">
                                <p >Home |</p>
                            </div>
                            <div className="pe-1">
                                <p >Product |</p>
                            </div>
                            <div className="pe-1">
                                <span>{data.book.name} |</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End header-Bottom */}
            <div className="container pt-5">
                <div className="row justify-content-start">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-5">
                                <div className="product-img">
                                    <img src={imageFocus ? imageFocus : images[0]} alt="" width="100%" />
                                </div>

                                <div className="pt-2">
                                    <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                    // navigation
                                    >
                                        {images.map((image: string) => (
                                            <SwiperSlide key={image} onClick={() => addImageFocus(image)}>
                                                <div style={{ cursor: 'pointer' }}>
                                                    <div className="img-about-slide">
                                                        <img width="100%" src={image} alt="" />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="product-title">
                                    <h1 style={{ color: 'black', textAlign: 'left' }}>{data.book.name}</h1>
                                </div>
                                <div className="product-price">
                                    <span style={{ display: 'block', textAlign: 'left' }}>{formatprice(data.book.price)}</span>
                                </div>
                                <div className="product-description mt-3">
                                    <span style={{ display: 'block', textAlign: 'left' }}>{data.book.des}</span>
                                </div>
                                <div className="d-flex align-items-center baseline mt-5">
                                    <div className="num-block skin-6">
                                        <div className="num-in me-3 d-flex align-items-center">
                                            <span onClick={handleClickGiam} className="minus dis">-</span>
                                            <input onChange={handleChange} value={count} type="number" min="1" max="20" className="in-num num1234 form-control" />
                                            <span onClick={handleClickTang} className="plus">+</span>
                                        </div>

                                    </div>
                                    <div className="button-addtocard">
                                        <Button onClick={handleClickAdd} className="btn">
                                            ADD TO CARD
                                        </Button>
                                    </div>
                                </div>
                                <div className="
                                        d-flex
                                        justify-content-start
                                        mt-3
                                        product-relate
                                        border-bottom
                                        pb-3
                                    ">
                                    <div className="Wistlist pe-4">
                                        <p ><i className="far fa-heart pe-2" />Wistlist</p>
                                    </div>
                                    <div className="Compare">
                                        <p ><i className="fas fa-list-ul pe-2" />Compare</p>
                                    </div>
                                </div>
                                <div className="product-description-content mt-3 d-flex">
                                    <div>
                                        <span>Thể loại: {data.book.genre}</span>
                                    </div>
                                    <div className="mx-4">
                                        <span>Tác giả: <p >{data.book.author.name}</p></span>
                                    </div>
                                    <div className="tag">
                                        <span>Tags: <p >Tag 0-1</p></span>
                                    </div>
                                </div>
                                <div className="icon mt-2">
                                    <div className="d-flex justify-content-start">
                                        <div className="facebook pe-2">
                                            <p ><i className="fab fa-facebook rounded-circle" /></p>
                                        </div>
                                        <div className="twitter pe-2">
                                            <p ><i className="fab fa-twitter-square" /></p>
                                        </div>
                                        <div className="gmail">
                                            <p ><i className="fas fa-envelope" /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End content-product */}
                            <div className="container mt-5">
                                <div className="d-flex justify-content-evenly border-top pt-4">
                                    <div className="description">
                                        <p className="border-bottom border-4 border-warning">DESCRIPTION</p>
                                    </div>
                                    <div className="reviews">
                                        <p>REVIEWS</p>
                                    </div>
                                    <div className="aboutbrand">
                                        <p>ABOUT BRANDS</p>
                                    </div>
                                </div>
                                <div className="content-description">
                                    <div className=" mt-4">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.
                                            Ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi.
                                            Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus, ultricies posuere erat. Duis convallis, arcu nec aliquam consequat, purus felis vehicula felis, a dapibus enim lorem nec augue. Nunc facilisis sagittis ullamcorper.</span>
                                    </div>
                                </div>
                            </div>
                            {/* End Mô tả */}
                            <div className="container mt-5">
                                <div className="relateProduct-content text-center">
                                    <h1 style={{ color: "black" }}>Sản phẩm liên quan</h1>
                                </div>
                                <div className="d-flex mt-5">
                                    <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={20}
                                        slidesPerView={3}
                                        navigation
                                    >
                                        {dataBookQuery.length > 0 && dataBookQuery.map((book: any) => (
                                            <SwiperSlide key={book.id}>
                                                <Card hoverable>
                                                    <Link to={"/" + data.book.author.slug + "/" + book.slug}className="product-relate-content">
                                                        <div className="text-center">
                                                            <img width="100%" height="270" style={{objectFit: 'cover'}} src={JSON.parse(book.image)[0]} alt="" />
                                                        </div>
                                                        <div className="fw-bold mt-2">
                                                            <p>{book.name}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between"><div className="ratings text-center">
                                                            <p><i className=" fa fa-star" /></p>
                                                            <p title="2/5"><i className="fa fa-star" /></p>
                                                            <p title="3/5"><i className="fa fa-star" /></p>
                                                            <p title="4/5"><i className=" fa fa-star" /></p>
                                                            <p title="5/5"><i className=" fa fa-star" /></p>
                                                        </div>
                                                            <div className="price fw-bold text-center">
                                                                <p>{formatprice(book.price)}</p>
                                                            </div></div>
                                                    </Link>
                                                </Card>
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </div>
                            </div>
                            {/* End sản phẩm liên quan */}
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="top-">
                            <div className="top--title">
                                <h5>TOP SẢN PHẨM</h5>
                            </div>
                            <div className="d-grid justify-content-between">
                                <div className="row">
                                    {bookTopQuery.length > 0 && bookTopQuery.map((book) => (
                                        <Card key={book.id} hoverable className="mb-2">
                                            <Link to={"/" + book.author.slug + "/" + book.slug}className="d-flex col-12 mt-3">
                                                <div className="me-2">
                                                    <img src={JSON.parse(book.image)} alt="" width="100" />
                                                </div>
                                                <div className="fw-bold">
                                                    <p >{book.name}</p>
                                                    <div className="ratings ">
                                                        <p><i className=" fa fa-star" /></p>
                                                        <p title="2/5"><i className=" d fa fa-star" /></p>
                                                        <p title="3/5"><i className=" fa fa-star" /></p>
                                                        <p title="4/5"><i className=" fa fa-star" /></p>
                                                        <p title="5/5"><i className=" fa fa-star" /></p>
                                                    </div>
                                                    <div className="price fw-bold ">
                                                        <p >{formatprice(book.price)}</p>
                                                    </div>
                                                    <div className="price fw-bold ">
                                                        <p >Tác giả: {book.author.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Card>

                                    ))}

                                </div>
                                {/* End Sản phẩm nổi bật */}
                                <div className=" mt-4">
                                    <h4>COMPARE</h4>
                                    <div>
                                        <span>No products to compare</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetail
