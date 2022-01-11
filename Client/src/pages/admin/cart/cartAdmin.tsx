import { useMutation, useQuery } from '@apollo/client';
import { Button, Spin, Table } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formatprice from '../../../common/formatprice';
import { deleteStatusOrder, updateStatusOrder } from '../../../graphql-client/mutations';
import { getOrders } from '../../../graphql-client/query';

interface Props {
    
}

const columns = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Số lượng',
        dataIndex: 'orderCount',
    },  
    {
        title: 'Tổng tiền',
        dataIndex: 'total',
    },  
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },  
    {
        title: 'Xem chi tiết',
        dataIndex: 'cartDetail',
    },    
];



const CartAdmin = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
    const { loading, error, data } = useQuery(getOrders)
    const [add, Mutation] = useMutation<any>(updateStatusOrder);
    const [dele, Muta] = useMutation<any>(deleteStatusOrder);
    // const [add, Mutation] = useMutation<any>(deleteBook);
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error book ...</p>
    }
    const start = () => {
        setTimeout(() => {
            setSelectedRowKeys([]);
        }, 1000);
    };
    const handleRemoveOrder = (id: string) => {
        if (window.confirm("Bạn có muốn hủy đơn hàng hay không ?")) {
            dele({
                variables: { id },
                refetchQueries: [{ query: getOrders }]
            })
        }
    }
    const handleUpdateOrder = (id: string, status: number) => {
        add({
            variables: { id, status },
            refetchQueries: [{ query: getOrders }]
        })
    }

    const showBtnStatus = (status: number, id: string) => {
        let html = null;
        if (status === 2) {
            html = <div className="">
                <Button className="mb-2" onClick={() => handleRemoveOrder(id)} danger>Hủy đơn hàng</Button>
                <Button type="primary" onClick={() => handleUpdateOrder(id, status)}>Xác nhận đã gửi hàng</Button>
            </div>
        } else if (status === 3) {
            html = <div className="">
                <Button type="primary" disabled>Đang giao hàng</Button>
            </div>
        } else if (status === 4) {
            html = <div className="">
               <Button type="primary" disabled style={{backgroundColor: '#0cc11a'}}>Thành công</Button>
            </div>
        } else if (status === 5) {
            html = <div className="">
                <Button danger disabled>Đơn hàng đã hủy</Button>
            </div>
        } else {
            html = <div className="">
                <Button className="mb-2" disabled type="primary">Chưa xác nhận</Button>
                <Button onClick={() => handleRemoveOrder(id)} danger>Hủy đơn hàng</Button>
            </div>
        }
        return html;
    }
    
    const data1: any[] | undefined = [];
    for (let i = 0; i < data.orders.length; i++) {
        const listOrder = JSON.parse(data.orders[i].listOrder);
        let total = 0;
        listOrder.forEach((item: any) => {
            total += item.quantity*item.book.price
        })
        data1.push({
            key: data.orders[i].id,
            name: data.orders[i].name,
            email: data.orders[i].email,
            address: data.orders[i].address,
            phone: data.orders[i].phone,
            orderCount: listOrder.length,
            total: formatprice(total),
            status: showBtnStatus(data.orders[i].status, data.orders[i].id),
            cartDetail: <Button type="primary"><Link to={"/admin/cartDetail/" + data.orders[i].id}>Xem chi tiết</Link></Button>
        });
    }

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={false}>
                    Bỏ chọn
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data1} />
        </div>
    )
}

export default CartAdmin
