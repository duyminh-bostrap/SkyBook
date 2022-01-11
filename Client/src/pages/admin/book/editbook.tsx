import { useMutation, useQuery } from '@apollo/client';
import {
    Button, Form,
    Input, Select, Spin
} from 'antd';
import {
    getDownloadURL, getStorage,
    ref, uploadBytes, uploadBytesResumable
} from "firebase/storage";
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../common/firebase/index';
import { toastDefault } from '../../../common/toast';
import { updateSingleBook } from '../../../graphql-client/mutations';
import { getAuthors, getBooks, getSingleBook } from '../../../graphql-client/query';
import Uploadimage from '../uploadimage';
import './form.css';

const { Option } = Select;
interface Props {

}

const Editbook: React.FC = (props: Props) => {
    const {slug} = useParams();
    const { loading: loading1, error: error1, data: data1} = useQuery(getSingleBook, {
        variables: {
            slug: slug,
        }
    })
    const navigate = useNavigate();
    const [add, Mutation] = useMutation<any>(updateSingleBook);
    const [imageFile, setImageFile] = useState<any>([]);
    const uploadImageState = useCallback((image) => {
        setImageFile(image)
    }, [])
    const { loading, error, data } = useQuery(getAuthors)
    if (loading || loading1) {
        return <Spin size="large" />
    }
    if (error || error1) {
        return <p>error authors ...</p>
    }
    
    const onFinish = async (values: any) => {
        values.price = Number(values.price)
        values.id = data1.book.id
        const storage = getStorage();
        const uploadImagePromise = (image: any) => {
            return new Promise(function (resolve, reject) {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadBytes(storageRef, image).then(async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadUrl);
                });
            });
        };
        const listImageUrl: string[] = [];
        for (let i = 0; i < imageFile.length; i++) {
            await uploadImagePromise(imageFile[i].originFileObj).then((response: any) => {
                listImageUrl.push(response)
            });
        }
        values.image = JSON.stringify(listImageUrl);
        console.log(values);
        add(
            {
                variables: values,
                refetchQueries: [{ query: getBooks }]
            },
        )
    };

   
    if (Mutation.loading) {
        return <Spin size="large" />
    }
    if (Mutation.data) {
        toastDefault('Sửa sách thành công')
        navigate('/admin/books')
    }
    return (
        <div>
            <Form style={{ overflow: 'auto' }} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.Item name="name" label="Tên sách" rules={[{ required: true, message: 'Bạn phải nhập Tên sách' }]}>
                    <Input defaultValue={data1.book.name} />
                </Form.Item>
                <Form.Item name="des" label="Mô tả" rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm' }]}>
                    <Input defaultValue={data1.book.des} />
                </Form.Item>
                <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Bạn phải nhập giá tiền cho sản phẩm này' }]}>
                    <Input type="number" defaultValue={Number(data1.book.price)} />
                </Form.Item>
                <Form.Item name="genre" label="Thể loại chuyện" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Input defaultValue={data1.book.genre} />
                </Form.Item>
                <Form.Item name="image" label="Thêm ảnh">
                    <Uploadimage imageData={data1.book.image} uploadImageState={uploadImageState} />
                </Form.Item>
                <Form.Item name="authorId" label="Tác giả" rules={[{ required: true, message: 'Bạn phải nhập thể loại truyện' }]}>
                    <Select defaultValue="lucy">
                        <Option value="lucy" disabled>Chọn tác giả</Option>
                        {data.authors.map((author: any) => (<Option key={author.id} value={author.id}>{author.name}</Option>))}
                    </Select>
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


export default Editbook