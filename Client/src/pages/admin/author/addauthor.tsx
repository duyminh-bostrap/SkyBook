import { FundOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import {
    Button, Form,
    Input, Spin
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toastDefault } from '../../../common/toast';
import { addSingleAuthor } from '../../../graphql-client/mutations';
import { getAuthors } from '../../../graphql-client/query';
import './form.css';
interface Props {

}


const Addauthor: React.FC = (props: Props) => {
    const navigate = useNavigate();
    const [add, Mutation] = useMutation<any>(addSingleAuthor);
    const onFinish = (values: any) => {
        values.field = JSON.stringify(values.field)
        values.phone = Number(values.phone)
        add(
            {
                variables: values,
                refetchQueries: [{ query: getAuthors }]
            },
        )
    };
    console.log(add);
    
    if (Mutation.loading) {
        return <Spin size="large" />
    }
    if (Mutation.data) {
        toastDefault('Thêm tác giả thành công')
        navigate('/admin/authors')
    }
    return (
        <div>
            <h2>Thêm tác giả</h2>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên tác giả" rules={[{ required: true, message: 'Bạn phải nhập tên tác giả' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Bạn phải nhập tên email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Bạn phải nhập địa chỉ' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Bạn phải nhập số điện thoại' }]}>
                    <Input type="tel" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Addauthor