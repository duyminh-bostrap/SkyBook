import { Button, Pagination } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
interface Props {
    
}

const Blog = (props: Props) => {
    return (
        <div>
  <div className="container-fuild header-bottom">
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="header-product-text">
          <h1 className="page-header-title clr" itemProp="headline">Blog</h1>
        </div>
        <div className="d-flex header-product-a">
          <div className="pe-1">
            <Link to="/">Home |</Link>
          </div>
          <div className="pe-1">
            <Link to="/blog">Blog |</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End header-Bottom */}
  <div className="container mt-5">
    <div className="d-flex">
      <div className="col-8 ">
        {/* Ket thuc */}
        <div>
          <div className="datetime ms-2 mt-2 fw-bold">
            <span>JUNE 30,2018</span>
          </div>
          <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog7.jpg" alt="" width="100%" />
        </div>
        <div className="title-blog mt-4">
          <h4>Sample post title with format Video</h4>
        </div>
        <div className="d-flex">
          <div className=" pe-3">
            <i className="far fa-user"> Admin </i>
            <span> - </span>
          </div>
          <div className="pe-3">
            <i className="far fa-comment "> 0 Comments</i>
          </div>
        </div>
        <div className="mt-2">
          <span>All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she…</span>
        </div>
        <div className="button-blog mt-3 border-bottom pb-4">
          <Button type="primary">CONTINUE READING &gt; </Button> 
        </div>
        {/* Ket thuc */}
        <div className=" mt-4">
          <div className="datetime ms-2 mt-2 fw-bold">
            <span>JUNE 30,2018</span>
          </div>
          <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog6.jpg" alt="" width="100%" />
        </div>
        <div className="title-blog mt-4">
          <h4>Sample post title with format Video</h4>
        </div>
        <div className="d-flex">
          <div className=" pe-3">
            <i className="far fa-user"> Admin </i>
            <span> - </span>
          </div>
          <div className="pe-3">
            <i className="far fa-comment "> 0 Comments</i>
          </div>
        </div>
        <div className="mt-2">
          <span>All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she…</span>
        </div>
        <div className="button-blog mt-3 border-bottom pb-4">
          <Button type="primary">CONTINUE READING &gt; </Button> 
        </div>
        <div className="mt-3">
          <div className="datetime ms-2 mt-2 fw-bold">
            <span>JUNE 30,2018</span>
          </div>
          <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog1.jpg" alt="" width="100%" />
        </div>
        <div className="title-blog mt-4">
          <h4>Sample post title with format Video</h4>
        </div>
        <div className="d-flex">
          <div className=" pe-3">
            <i className="far fa-user"> Admin </i>
            <span> - </span>
          </div>
          <div className="pe-3">
            <i className="far fa-comment "> 0 Comments</i>
          </div>
        </div>
        <div className="mt-2">
          <span>All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she…</span>
        </div>
        <div className="button-blog mt-3 border-bottom pb-4">
          <Button type="primary">CONTINUE READING &gt; </Button> 
        </div>
        <Pagination style={{margin: "20px 0px"}} defaultCurrent={1} total={50} />
      </div>
      <div className="col-4 ps-4">
        <div>
          <input type="search" placeholder="Search..." className="p-2" style={{outline: 'none', borderRadius: '5px', width: '100%'}} />
        </div>
        <div className=" mt-4">
          <h4>RENCENT POSTS</h4>
          {/*  */}
          <div className="d-flex pb-5">
            <div className="col-4 mt-2">
              <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog1.jpg" alt="" width="100%" />
            </div>
            <div className="ps-3">
              <span>Sample post title with format Video</span>
              <p className="text-secondary">JUNE 30,2018</p>
            </div>
          </div>
          <div className="d-flex pb-5">
            <div className="col-4 mt-2">
              <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog1.jpg" alt="" width="100%" />
            </div>
            <div className="ps-3">
              <span>Sample post title with format Video</span>
              <p className="text-secondary">JUNE 30,2018</p>
            </div>
          </div>
          <div className="d-flex pb-5">
            <div className="col-4 mt-2">
              <img src="https://skybook.woovina.net/demo-01/wp-content/uploads/2018/06/blog1.jpg" alt="" width="100%" />
            </div>
            <div className="ps-3">
              <span>Sample post title with format Video</span>
              <p className="text-secondary">JUNE 30,2018</p>
            </div>
          </div>
          {/* Ket thuc */}
        </div>
        <div className="Archive mt-3">
          <h3>ARCHIVE</h3>
          <div>
            <span>June 2018</span>
          </div>
        </div>
        <div className="mt-5">
          <h3>RENCENT COMMENTS</h3>
          <div className="mt-2 pb-2">
            <span>admin on Simple Product 005</span>
          </div>
          <div className="mt-2 pb-2">
            <span>admin on Simple Product 005</span>
          </div>
          <div className="mt-2 pb-2">
            <span>admin on Simple Product 005</span>
          </div>
          <div className="mt-2 pb-2">
            <span>admin on Simple Product 005</span>
          </div>
          <div className="mt-2 pb-2">
            <span>admin on Simple Product 005</span>
          </div>
        </div>
        <div className="Archive mt-5 ">
          <h3>META</h3>
          <div>
            <span>Register</span>
          </div>
          <div>
            <span>Log in</span>
          </div>
          <div>
            <span>Entried Feed</span>
          </div>
          <div>
            <span>Comment Feed</span>
          </div>
          <div>
            <span>Wordpress.org</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Blog
