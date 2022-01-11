import {
    AppstoreOutlined, SettingOutlined, UserOutlined
} from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Col, Layout, Menu, Row, Spin } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React from "react";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toastError } from '../common/toasterror';
import { getUserQuery } from '../graphql-client/query';
const { SubMenu } = Menu;
const LayoutAdmin: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user)
    const { loading, error, data } = useQuery(getUserQuery, {
        variables: {
            email: user.email,
        }
    })

    if (loading) {
        return <Spin size="large" />
    }
    if (data) {
        if (data.user.role === 0) {
            navigate('/')
            toastError('Bạn không có quyền truy cập trang này !!!')
        }
    }
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    return (
        <Layout>
            <Header className="header">

            </Header>
            <Row>
                <Col span={5}>
                    <Menu
                        onClick={handleClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="1">
                                <Link to="/admin/user">Thống kê người dùng</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Tác giả">

                            <Menu.Item key="2">
                                <Link to="/admin/authors">Thống kê tác giả</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/admin/addauthor">Thêm tác giả</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<SettingOutlined />} title="Sản phẩm sách">
                            <Menu.Item key="4">
                                <Link to="/admin/books">Thống kê sách</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/admin/addbook">Thêm sách</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" icon={<SettingOutlined />} title="Đơn đặt hàng">
                            <Menu.Item key="10">
                                <Link to="/admin/cart">Thống đơn đặt hàng</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Doanh thu">
                            <Menu.Item key="6">
                                <Link to="/admin/books">Thống kê doanh thu</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/admin/books">Thống kê hóa đơn</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" icon={<SettingOutlined />} title="Bình luận">
                            <Menu.Item key="8">
                                <Link to="/admin/books">Thống kê bình luận</Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to="/admin/books">Thống kê đánh giá</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={19}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '100vh',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Col>
            </Row>
        </Layout>

    );
};
export default LayoutAdmin;
