import { useMutation, useQuery } from '@apollo/client';
import { Button, Spin, Table } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import formatprice from '../../../common/formatprice';
import { toastDefault } from '../../../common/toast';
import { deleteBook } from '../../../graphql-client/mutations';
import { getBooks} from '../../../graphql-client/query';

interface Props {

}

const columns = [
    {
        title: 'Tên sách',
        dataIndex: 'name',
    },
    {
        title: 'Thể loại truyện',
        dataIndex: 'genre',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Mô tả',
        dataIndex: 'des',
    },
    {
        title: 'Tên tác giả',
        dataIndex: 'author',
    },    
    {
        title: 'Action',
        dataIndex: 'btnEdit',
    },    
];



const Book: React.FC = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
    const { loading, error, data } = useQuery(getBooks)
    const [add, Mutation] = useMutation<any>(deleteBook);
    const [page, setPage] = useState({current: 1, pageSize: 3})
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
    const data1: any[] | undefined = [];
    if(data.books.length > 0){
        for (let i = 0; i < data.books.length; i++) {
            const link = '/admin/editbook/' + data.books[i].slug
            const image = JSON.parse(data.books[i].image)[0]
            const author = data.books[i].author.name
            data1.push({
                key: data.books[i].id,
                name: data.books[i].name,
                genre: data.books[i].genre,
                price: formatprice(data.books[i].price),
                image: <img src={image} width="100" alt="" />,
                des: data.books[i].des,
                author: author,
                btnEdit: <Button type="primary"><Link to={link}>Sửa sản phẩm</Link></Button>,
            });
        }
    }

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const onRemove = () => {
        if(window.confirm('Are you sure you want to remove')){
            selectedRowKeys.forEach(id => {
                add({
                    variables: {id},
                    refetchQueries: [{ query: getBooks }]
                },)
            })
            setSelectedRowKeys([])
            toastDefault('Xóa sách thành công')
        }
    }

    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleTableChange = (pagination: any) => {
        setPage(pagination)
      };
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={false}>
                    Bỏ chọn
                </Button>
                <Button danger style={{ marginLeft: 20}} type="primary" onClick={onRemove} disabled={!hasSelected} loading={false}>
                    Xóa
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} onChange={handleTableChange} pagination={page} columns={columns} dataSource={data1} />
        </div>
    )
}
export default Book