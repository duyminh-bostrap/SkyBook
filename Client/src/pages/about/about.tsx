import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
interface Props {

}

const About = (props: Props) => {
    return (
        <div>
            <div className="container-fuild header-bottom">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div className="header-product-text">
                            <h1 className="page-header-title clr" itemProp="headline">About Us</h1>
                        </div>
                        <div className="d-flex header-product-a">
                            <div className="pe-1">
                                <Link to="/">Home |</Link>
                            </div>
                            <div className="pe-1">
                                <Link to="/about-us" >About us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End header-Bottom */}
            <div className="container mt-5">
                <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2020/05/about-banner-1.jpg" alt="" width="100%" />
            </div>
            <div className="container outstory mt-5 ">
                <div className="text-center">
                    <span className="fs-3">Our <span style={{ color: '#f07c29' }}>Story</span></span>
                </div>
                <div className="d-flex">
                    <div className="col-4 outstory-span border-5 border-start ps-5 pe-5">
                        <span className="lh-lg">“Et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio”</span>
                    </div>
                    <div className="col-8">
                        <div className="mt-2">
                            <span >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur:</span>
                        </div>
                        <div className="mt-5">
                            <span className="fw-bold">At Bero Wos</span>
                            <div >Et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</div>
                        </div>
                        <div className="mt-5">
                            <span className="fw-bold">Deleniti Atque</span>
                            <div >Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</div>
                        </div>
                        <div className="mt-5">
                            <span className="fw-bold">Nam Libero Tempore</span>
                            <div >Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</div>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-center mt-2 !important">
                    <span ><span className="fw-bold">Abdul Durga</span> - CEO</span>
                </div>
            </div>
            <div className="container-fuild mt-5">
                <img style={{width: '100%'}} src="http://127.0.0.1:5500/client/src/pages/product/demo/demo/image/banner2.png" alt="" />
            </div>
            <div className="container  mt-5">
                <div className="text-center mt-5 pb-5">
                    <span className="fs-3 fw-bold ">Why <span style={{ color: '#f07c29' }}>Choose</span> Us</span>
                </div>
                <div className="d-flex">
                    <div className="col-3 me-5">
                        <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2020/05/about-us-banner2.jpg" alt="" style={{ maxWidth: '100%' }} />
                    </div>
                    <div className="col-9 ps-5">
                        <div >
                            <span className="fw-bold">01.Lorem Ipsum</span>
                            <p>Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div className="mt-2">
                            <span className="fw-bold">02.Duis Aute Irure Dolor</span>
                            <p>In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur:</p>
                        </div>
                        <div className="mt-2">
                            <span className="fw-bold">03.Uas Molestias</span>
                            <p>Et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
                        </div>
                        <div className="mt-2">
                            <span className="fw-bold">04.Est Laborum Et Dolorum Fuga</span>
                            <p>Corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                        </div>
                        <div className="mt-2">
                            <span className="fw-bold">05.Omnis Dolor Repellendus</span>
                            <p>Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est..</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="text-center mt-5 ">
                    <span className="fw-bold fs-3">Frequently Asked</span> <span className="fw-bold fs-3" style={{ color: '#f07c29' }}>Questions</span>
                </div>
                <div className="d-flex mt-5">
                    <div className="col-5">
                        <div className="border border-1 fw-bold p-3"> 01.How can I change my shipping address?</div>
                        <div className="border border-1 fw-bold p-3"> 02.How can I use my remaining account credits?</div>
                        <div className="border border-1 fw-bold p-3"> 03.How do I activate my account?</div>
                        <div className="border border-1 fw-bold p-3">04.Why must I take payment immidiately at Checkout?</div>
                        <div className="border border-1 fw-bold p-3"> 05.What do you mean by points? How do I earn it?</div>
                        <div className="border border-1 fw-bold p-3"> 06.How can I track my orders &amp; payment?</div>
                    </div>
                    <div className="col-6 ps-5">
                        <div>
                            <span className="fw-bold">Have another questions? Please don’t hesitate to aks us.</span>
                        </div>
                        <div className="d-flex input-blog">
                            <div className="col-6 pe-5 mt-3">
                                <label className="fw-bold">Name <span className="text-danger">*</span> </label>
                                <div className="mt-1">
                                    <input type="text" width="100px" className="p-1 ps-2" />
                                </div>
                            </div>
                            <div className="col-5 mt-3">
                                <label className="fw-bold">Email <span className="text-danger">*</span> </label>
                                <div className="mt-1">
                                    <input type="text" width="100%" className="p-1 ps-2" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex input-blog">
                            <div className="col-6 pe-5 mt-3">
                                <label className="fw-bold">Company / Originization <span className="text-danger">*</span> </label>
                                <div className="mt-1">
                                    <input type="text" width="100px" className="p-1 ps-2" />
                                </div>
                            </div>
                            <div className="col-5 mt-3">
                                <label className="fw-bold">Subject <span className="text-danger">*</span> </label>
                                <div className="mt-1">
                                    <input type="text" width="100%" className="p-1 ps-2" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className="fw-bold">Your Message</label>
                            <div className="mt-2">
                                <textarea cols={72} rows={5} defaultValue={""} />
                            </div>
                        </div>
                        <div className="btn-blog ">
                            <button className="btn text-light">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About
