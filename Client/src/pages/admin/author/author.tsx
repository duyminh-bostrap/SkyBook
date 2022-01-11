import React, { useState } from 'react'
import { Table, Button, Spin} from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthors } from '../../../graphql-client/query';
import { Link } from 'react-router-dom';
import { deleteAuthor } from '../../../graphql-client/mutations';
import { toastDefault } from '../../../common/toast';
interface Props {

}

const columns = [
    {
        title: 'Tác giả',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },    
    {
        title: 'Action',
        dataIndex: 'btnEdit',
    },    
];



const Author: React.FC = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([])
    const { loading, error, data } = useQuery(getAuthors)
    const [add, Mutation] = useMutation<any>(deleteAuthor);
    if (loading) {
        return <Spin size="large" />
    }
    if (error) {
        return <p>error authors ...</p>
    }
    const start = () => {
        setTimeout(() => {
            setSelectedRowKeys([]);
        }, 1000);
    };
    if (Mutation.loading) {
        return <Spin size="large" />
    }
    // if (Mutation.loading) {
    //     toastDefault('Xóa tác giả thành công')
    // }

    const data1: any[] | undefined = [];
    for (let i = 0; i < data.authors.length; i++) {
        const link = '/admin/editauthor/' + data.authors[i].slug
        data1.push({
            key: data.authors[i].id,
            name: data.authors[i].name,
            address: data.authors[i].address,
            phone: data.authors[i].phone,
            email: data.authors[i].email,
            btnEdit: <Button type="primary"><Link to={link}>Sửa tác giả</Link></Button>,
        });
    }

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const onRemove = () => {
        if(window.confirm('Are you sure you want to remove')){
            console.log('id', selectedRowKeys)
            selectedRowKeys.forEach(id => {
                add({
                    variables: {id},
                    refetchQueries: [{ query: getAuthors }]
                },)
            })
            setSelectedRowKeys([])
            toastDefault('Xóa tác giả thành công')
        }
    }

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
                <Button danger style={{ marginLeft: 20}} type="primary" onClick={onRemove} disabled={!hasSelected} loading={false}>
                    Xóa
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data1} />
        </div>
    )
}
export default Author