import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd'
import React from 'react'
import { addComment } from '../../../graphql-client/mutations';
import { getBooks } from '../../../graphql-client/query';

interface Props {

}

const AddComment = (props: Props) => {
    const [add, Mutation] = useMutation<any>(addComment);
    const onFinish = async(values: any) => {
        values.avatar = 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
        values.bookId = '61ade21ab889d3ce2ad54685'
        values.danhgia = Number(values.danhgia)
        console.log('====================================');
        console.log(values);
        console.log('====================================');
        add(
            {
                variables: values,
                refetchQueries: [{query: getBooks}]
            },
        )
    };
    return (
        <Form style={{ overflow: 'auto' }} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item name="name" label="User Name" rules={[{ required: true, message: 'Bạn phải nhập Tên sách' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="danhgia" label="Đánh giá" rules={[{ required: true, message: 'Bạn phải nhập giá tiền cho sản phẩm này' }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="comment" label="Comment" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddComment
