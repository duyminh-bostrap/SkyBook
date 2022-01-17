import { gql } from '@apollo/client';
const addSingleBook = gql`
    mutation CreateBook($name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!){
        createBook(input: {name: $name, genre: $genre, des: $des, image: $image, authorId: $authorId, price: $price}){
            id
            name
        }
    }
`

const addSingleAuthor = gql`
    mutation addSingleAuthorMutation($name: String, $address: String, $phone: Int, $email: String){
        createAuthor(input: {
            name: $name,
            address: $address,
            phone: $phone,
            email: $email
        }){
            id
            name
        }
    }
`

const updateSingleAuthor = gql`
    mutation UpdateAuthor($id: ID!, $name: String, $address: String, $phone: Int, $email: String){
        updateAuthor(id: $id, input: {
            name: $name,
            address: $address,
            phone: $phone,
            email: $email
        }){
            id
            name
        }
    }
`

const deleteAuthor = gql`
    mutation DeleteAuthor($id: ID!){
        deleteAuthor(id: $id){
            name
        }
    }
`

const updateSingleBook = gql`
    mutation UpdateBook($id: ID!, $name: String, $genre: String, $des: String, $image: String, $price: Int, $authorId: ID!){
        updateBook(id: $id, input: {name: $name, genre: $genre, price: $price, authorId: $authorId, image: $image, des: $des}){
            id
            name
        }
    }
`

const deleteBook = gql`
    mutation DeleteBook($id: ID!){
        deleteBook(id: $id){
            name
        }
    }
`

const signIn = gql`
    mutation signInMutation($name: String, $password: String, $avatar: String, $email: String){
        createUser(input: {
            name: $name, email: $email, avatar: $avatar, password: $password
        }){
            id
            name
            avatar
            email
            role
        }
    }
`

const logIn = gql`
    mutation loginMutation($name: String, $email: String){
        login(name: $name, email: $email){
            id
            name
            avatar
            email
            role
        }
    }
`


const createOrder = gql`
    mutation CreateOrder($name: String, $email: String, $address: String, $phone: Int, $listOrder: String, $status: Int){
        createOrder(input: {
            name: $name, email: $email, address: $address, phone: $phone, listOrder: $listOrder, status: $status
        }){
            id
            listOrder
            name
            phone
            email
            address
            status
        }
    }
`
const updateStatusOrder = gql`
    mutation UpdateStatusOrder($id: ID!, $status: Int){
        updateStatusOrder(id: $id, status: $status){
            name
            listOrder
            date
        }
    }
` 

const deleteStatusOrder = gql`
    mutation DeleteStatusOrder($id: ID!){
        deleteStatusOrder(id: $id){
            name
            listOrder
            date
        }
    }
`
const danhGiaOrder = gql`
    mutation DanhGiaOrder($id: ID!, $comments: String, $danhgia: Int){
        danhGiaOrder(id: $id, comments: $comments, danhgia: $danhgia){
            name
            listOrder
            date
        }
    }
` 
const addComment = gql`
    mutation CreateComment($name: String, $email: String, $bookId: ID!, $avatar: String, $danhgia: Int, $comment: String){
        createComment(input: {
            name: $name, email: $email, avatar: $avatar, danhgia: $danhgia, bookId: $bookId, comment: $comment
        }){
            name
            email
            avatar
            comment
        }
    }
` 

const deleteComment = gql`
    mutation DeleteComment($id: ID!){
        deleteComment(id: $id){
            name
            listOrder
            date
        }
    }
`

export { addSingleBook, addSingleAuthor, updateSingleBook, signIn, updateSingleAuthor,  deleteAuthor, deleteBook, createOrder, updateStatusOrder, deleteStatusOrder, danhGiaOrder, logIn, addComment, deleteComment }