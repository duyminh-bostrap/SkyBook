import {gql} from '@apollo/client'

const getBooks = gql`
    query getBooksQuery {
        books{
            name
            id
            des
            genre
            image
            slug
            price
            author {
                id
                name
                slug
            }
        }
    }
`

const getSingleBook = gql`
    query getSingleBookQuery($slug: String!){
        book(slug: $slug){
            id
            name
            des
            genre
            image
            slug
            price
            author {
                id
                name
                slug
                books{
                    id
                    name
                    slug
                    price
                    image
                }
            }
        }
    }
`

const getSingleAuthor = gql`
    query getSingleAuthorQuery($slug: String!){
        author(slug: $slug){
            id
            name
            slug
            address
            phone
            email
            books {
                id
                name
                des
                genre
                image
                slug
                price
            }
        }
    }
`

const getAuthors = gql`
    query getAuthorsQuery {
        authors {
            id
            name
            address
            phone
            email
            slug
        }
    }
`

const getUsers = gql`
    query getUsersQuery {
        users {
            id
            name 
            email
            avatar
            role
        }
    }
`

const getUserQuery = gql`
    query User($email: String!) {
        user(email: $email) {
            id
            name
            email
            role
        }
    }
`
const getOrders = gql`
    query getOrdersQuery{
        orders {
            id
            name
            email
            address
            phone
            listOrder
            status
            date
        }
    }
`

const getSingleOrder = gql`
    query getOrder($id: ID!){
        order(id: $id) {
            id
            name
            email
            address
            phone
            listOrder
            status
            date
        }
    }
`

const getOrderByEmail = gql`
    query getOrderByEmail($email: String!){
        orders(email: $email) {
            id
            name
            email
            address
            phone
            listOrder
            status
            date
            danhgia
            comments
        }
    }
`


export { getBooks, getAuthors, getSingleBook, getOrderByEmail,
getUsers, getSingleAuthor, getUserQuery, getOrders, getSingleOrder}