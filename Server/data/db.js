const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");
const slugify = require("slugify");
const Order = require("../models/order");
var nodemailer = require("nodemailer");
const mongooseDataMethods = {
  getAllBooks: async () => {
    return await Book.find();
  }, //get all books
  getBookById: async (id) => await Book.findById(id), // get a book by slug
  getBookBySlug: async (slug) => await Book.findOne({ slug: slug }), // get a book by slug
  createBook: async (args) => {
    // create a new book
    const newBook = new Book(args.input);
    newBook.slug = slugify(newBook.name);
    return await newBook.save();
  },
  updateBook: async (args) => {
    // update a book
    const BookUpdateConditions = { _id: args.id };
    args.input.slug = slugify(args.input.name);
    return await Book.findOneAndUpdate(BookUpdateConditions, args.input, {
      new: true,
    });
  },
  deleteBook: async (args) => {
    // delete a book
    console.log(args);
    const BookUpdateConditions = { _id: args.id };
    return await Book.findOneAndDelete(BookUpdateConditions);
  },
  getAllAuthors: async () => await Author.find(), //get all authors
  getAuthorBySlug: async (slug) => await Author.findOne({ slug: slug }), //get a author by id
  getAuthorById: async (id) => await Author.findById(id), //get a author by id
  createAuthor: async (args) => {
    // create a new author
    const newAuthor = new Author(args.input);
    newAuthor.slug = slugify(newAuthor.name);
    await newAuthor.save();
    return newAuthor;
  },
  deleteAuthor: async (args) => {
    const BookUpdateConditions = { _id: args.id };
    return await Author.findOneAndDelete(BookUpdateConditions);
  },
  updateAuthor: async (args) => {
    const BookUpdateConditions = { _id: args.id };
    args.input.slug = slugify(args.input.name);
    return await Author.findOneAndUpdate(BookUpdateConditions, args.input, {
      new: true,
    });
  },
  getUserByEmail: async (email) => await User.findOne({ email: email }),
  getUsers: async () => await User.find(),
  signUpUser: async (args) => {
    const newUser = new User(args.input);
    await newUser.save()
    return newUser;
  },
  createOrder: async (args) => {
    const order = new Order(args.input);
    const listOrder = JSON.parse(order.listOrder);
    let total = 0;
    listOrder.forEach((item) => {
        total += item.book.price*item.quantity;
    })
    var todayDate = new Date().toISOString().slice(0, 10);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "truongmanhdung04@gmail.com",
        pass: "dung@12345",
      },
    });
    var mailOptions = {
      from: "truongmanhdung04@gmail.com",
      to: order.email,
      subject: "Thông tin đơn hàng, vui lòng xác nhận đơn hàng của bạn",
      html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
              </head>
              <body>
                <div
                  style="
                    width: 1333px;
                    border-width: 0px 1px 1px;
                    border-top-style: initial;
                    border-right-style: solid;
                    border-bottom-style: solid;
                    border-left-style: solid;
                    border-top-color: initial;
                    border-right-color: rgb(204, 204, 204);
                    border-bottom-color: rgb(204, 204, 204);
                    border-left-color: rgb(204, 204, 204);
                    border-image: initial;
                    overflow: hidden auto;
                  "
                >
                  <div
                    class="nicEdit-main"
                    contenteditable="true"
                    style="width: 1325px; margin: 4px; min-height: 625px; overflow: hidden"
                  >
                    <table
                      style="
                        margin: 0px auto;
                        padding: 0px;
                        width: 596px;
                        color: rgb(102, 102, 102);
                        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        background-color: rgb(235, 235, 235);
                        min-height: 80px;
                        align-items: center;
                        line-height: 80px;
                        box-sizing: border-box;
                        padding-top: 20px;
                        display: flex;
                      "
                    >
                      <tbody style="margin: 0px auto; padding: 0px; box-sizing: border-box; height: 80px;">
                        <tr style="margin: 0px auto; padding: 0px; box-sizing: border-box">
                          <td
                            style="margin: 0px auto; padding: 0px; vertical-align: middle; box-sizing: border-box"
                          >
                            <a
                              href="https://api.luxstay.com/"
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://api.luxstay.com&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNFLrA85caYKQvTevVr46DB1aShGmg"
                              style="
                                margin: 0px auto;
                                padding: 0px;
                                box-sizing: border-box;
                                color: rgb(17, 85, 204);
                                text-decoration-line: none;
                              "
                              ><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 103 59" aria-hidden="true" alt="" class="sc-pBzUF jfMcol logo1" opacity="1" visibility="visible" height="50px"><path class="crown" d="M39.4,10.7c0.2,0,0.3,0,0.4-0.1L45,28h0c0.6,1.9,3.4,3.4,6.8,3.4c3.4,0,6.2-1.5,6.8-3.4h0l5.1-17.4  c0.1,0,0.3,0,0.4,0c1,0,1.8-0.8,1.8-1.8c0-1-0.8-1.8-1.8-1.8c-1,0-1.8,0.8-1.8,1.8c0,0.7,0.4,1.3,1,1.6l-5.9,12.7l1-17.1  c0,0,0,0,0,0c1,0,1.8-0.8,1.8-1.8c0-1-0.8-1.8-1.8-1.8c-1,0-1.8,0.8-1.8,1.8c0,0.8,0.6,1.5,1.3,1.7l-3.9,16.7L52,4.3  c0.9-0.1,1.5-0.9,1.5-1.8c0-1-0.8-1.8-1.8-1.8c-1,0-1.8,0.8-1.8,1.8c0,0.9,0.7,1.7,1.5,1.8l-1.9,18.4L45.7,6C46.5,5.8,47,5.1,47,4.3  c0-1-0.8-1.8-1.8-1.8c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8c0,0,0,0,0,0l1,17.1l-5.9-12.7c0.6-0.3,1-0.9,1-1.6  c0-1-0.8-1.8-1.8-1.8c-1,0-1.8,0.8-1.8,1.8C37.6,9.9,38.4,10.7,39.4,10.7z M51.8,26.5c3.1,0,5.6,0.8,5.6,1.8c0,1-2.5,1.8-5.6,1.8  c-3.1,0-5.6-0.8-5.6-1.8C46.1,27.3,48.7,26.5,51.8,26.5z"></path><path class="letters" d="M31.9,38.7c-5.2,0-9.3,4.2-9.3,9.2c0,5,4.2,9.2,9.3,9.2c5.2,0,9.3-4.2,9.3-9.2C41.2,42.9,37.1,38.7,31.9,38.7z   M35.8,53.2c-0.3,0.4-0.7,0.8-1.1,1.1c-0.7,0.5-1.5,0.9-2.3,0.9c-0.2,0-0.3,0-0.5,0c-0.2,0-0.3,0-0.5,0c-0.8,0-1.6-0.4-2.3-0.9  c-0.4-0.3-0.8-0.7-1.1-1.1c-1-1.3-1.6-3.2-1.6-5.3c0-2,0.5-3.7,1.4-5.1c0.5-0.9,1.2-1.6,2.2-2c0,0,0,0,0,0c0,0,0.1,0,0.1-0.1  c0.1-0.1,0.2-0.1,0.4-0.1c0.4-0.1,0.9-0.2,1.3-0.2c0.5,0,0.9,0.1,1.3,0.2c0.1,0,0.3,0.1,0.4,0.1c0,0,0.1,0,0.1,0.1c0,0,0,0,0,0  c0.9,0.4,1.7,1.1,2.2,2c0.9,1.3,1.4,3.1,1.4,5.1C37.4,50,36.8,51.9,35.8,53.2z"></path><path class="letters" d="M59.7,49.8h-1.3v2.6c0,1.6-1.3,2.8-2.9,2.8c0,0,0,0,0,0v0h-4h-1.5V40.6h2.5v-1.3h-2.5l0,0h-0.3h-6.2v1.3h2.5  v14.6h-2.5v1.3h14.9h1.1h0.1h0.1v0h0v-4.2h0V49.8z"></path><path class="letters" d="M79.5,39.4L79.5,39.4h-0.1h-4H62.5v1.3h2.5v14.6h-2.5v1.3v0h12.9h2.9h1.1h0.1h0h0.1v-4.2v-1.9h-1.3v2l0,0  c0,1.6-1.3,2.8-2.9,2.8c0,0,0,0,0,0v0h-4.6v0H69h-0.1v-7V48h1.3c0,0,0,0,0,0H71l0,0c1.2,0,2.1,1,2.1,2.1c0,0,0,0,0,0h0v0.7l0,0v0.3  h1.2V51V48v0v-1.1v0V44v-0.1h-1.2v0.8h0c0,0,0,0,0,0c0,1.2-0.9,2-2.1,2l0,0h-0.8h-0.8h-0.5v-6.2H69h3.7c0,0,0,0,0.1,0h2.6  c1.6,0,2.8,1.3,2.9,2.8l0,0v1.8h1.3v-1.7L79.5,39.4L79.5,39.4L79.5,39.4z"></path><path class="letters" d="M101.8,55.3c-1.2,0-1.5-0.4-2.5-1.5l-5.7-7.1l3.8-4.5v0c1-1.2,1.3-1.6,2.6-1.6h0.8h0.2v-1.3h-0.2H97h-0.2h-2.7  H94v1.3h0.2h1.4v0c0,0,0,0,0,0c0.3,0,0.6,0.3,0.6,0.6c0,0.1,0,0.2-0.1,0.3l-3.3,4L90,42.3l-0.5-0.7c-0.1-0.1-0.1-0.2-0.1-0.4  c0-0.3,0.3-0.6,0.6-0.6h1.5v-1.3h-2.7h-3.9h-2.1v1.3h0.4c1.1,0.1,1.4,0.4,2.3,1.4l5,6.3L86,53.7v0c-1,1.2-1.3,1.6-2.6,1.6h-0.8h-0.3  v1.3h0.3h4.3h0.3h2.3h0.3v-1.3h-0.3h-1.6v0c0,0,0,0,0,0c-0.3,0-0.6-0.3-0.6-0.6c0-0.1,0.1-0.3,0.1-0.4l4-4.8l3.3,4.2l0.5,0.6  c0.1,0.1,0.1,0.2,0.1,0.4c0,0.3-0.3,0.6-0.6,0.6c0,0,0,0,0,0l0,0h-1.6v1.3h0v0h9.3v-1.3L101.8,55.3L101.8,55.3z"></path><path class="letters" d="M19.6,55.2l-1.1-3.3c-0.5-1.5-0.9-2.1-1.7-2.9c-0.5-0.5-1.3-0.7-1.9-0.9c2.1-0.3,3.7-2.2,3.7-4.4  c0-2.4-2-4.4-4.4-4.4c0,0-0.1,0-0.1,0v0H7.4h-4H1v1.3h2.4v14.6H0.9v1.3h6.4l0,0h2.5v-1.3H7.4v-7h1.9c0.1,0,0.1,0,0.2,0h0.4  c0.6,0,1.1,0.1,1.6,0.2c0.4,0.1,0.9,0.3,1.2,0.5c0.4,0.3,0.9,0.7,1.3,1.3c0.1,0.2,0.2,0.4,0.3,0.5c0.7,1.4,1.2,3.3,1.7,5.7h3v0h2.7  v-1.3L19.6,55.2L19.6,55.2z M11.6,46.9H7.4v-6.3h4.2c1.8,0.1,3.2,1.3,3.2,3.1S13.4,46.8,11.6,46.9z"></path></svg></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style="
                        margin: 0px auto;
                        padding: 0px;
                        width: 596px;
                        color: rgb(102, 102, 102);
                        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        background-color: rgb(235, 235, 235);
                      "
                    >
                      <tbody style="margin: 0px auto; padding: 0px; box-sizing: border-box">
                        <tr style="margin: 0px auto; padding: 0px; box-sizing: border-box">
                          <td
                            style="margin: 0px auto; padding: 0px; box-sizing: border-box"
                          >
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 25px 25px 0px;
                                width: 592px;
                                background-color: rgb(255, 255, 255);
                                border-top: 3px solid rgb(244, 87, 16);
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <table
                                      class="m_6425257584780622054mobile-font-16"
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        width: 538px;
                                        font-size: 18px;
                                        line-height: 1.3;
                                      "
                                    >
                                      <tbody
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                        "
                                      >
                                        <tr
                                          class="m_6425257584780622054mobile-mb-10"
                                          style="
                                            margin: 0px auto 20px;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            display: block;
                                          "
                                        >
                                          <td
                                            style="
                                              margin: 0px auto;
                                              padding: 0px;
                                              box-sizing: border-box;
                                            "
                                          >
                                            Xin chào&nbsp;&nbsp;<a
                                              href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                              style="
                                                margin: 0px auto;
                                                padding: 0px;
                                                box-sizing: border-box;
                                                color: rgb(244, 87, 16);
                                                text-decoration-line: none;
                                                font-weight: 600;
                                              "
                                              >${order.name}</a
                                            >
                                          </td>
                                        </tr>
                                        <tr
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            display: block;
                                          "
                                        >
                                          <td
                                            style="
                                              margin: 0px auto;
                                              padding: 0px;
                                              box-sizing: border-box;
                                            "
                                          >
                                            Đơn đặt hàng của bạn chưa hoàn tất, vui lòng xác nhận đơn hàng đề hoàn tất
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 20px 25px 25px;
                                width: 592px;
                                background-color: rgb(255, 255, 255);
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        width: 538px;
                                        border: 1px solid rgb(206, 206, 206);
                                      "
                                    >
                                      <tbody
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                        "
                                      >
                                        <tr
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                          "
                                        >
                                          <td
                                            style="
                                              margin: 0px auto;
                                              padding: 0px;
                                              box-sizing: border-box;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                margin: 0px auto;
                                                padding: 20px 15px 20px 20px;
                                                width: 536px;
                                              "
                                            >
                                              <tbody
                                                style="
                                                  margin: 0px auto;
                                                  padding: 0px;
                                                  box-sizing: border-box;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 7px 0px;
                                                      box-sizing: border-box;
                                                      width: 200.391px;
                                                    "
                                                  >
                                                    Tên Khách Hàng
                                                  </td>
                                                  <td
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 7px 0px;
                                                      box-sizing: border-box;
                                                      width: 300.609px;
                                                    "
                                                  >
                                                    <strong
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                        color: rgb(244, 87, 16);
                                                        line-height: 1.3;
                                                      "
                                                      ><a
                                                        href="https://www.luxstay.com/rooms/68886"
                                                        target="_blank"
                                                        data-saferedirecturl="https://www.google.com/url?q=https://www.luxstay.com/rooms/68886&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNE-xg6XHKGavJAvoBL-Uy4MwHH5HA"
                                                        style="
                                                          margin: 0px auto;
                                                          padding: 0px;
                                                          box-sizing: border-box;
                                                          color: rgb(244, 87, 16);
                                                          text-decoration-line: none;
                                                          line-height: 1.3;
                                                        "
                                                        >${order.name}</a
                                                      ></strong
                                                    >
                                                  </td>
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Email: ${
                                                        order.email
                                                      }</span>
                                                  </td>
                                                  
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Số điện thoại: 0${
                                                        order.phone
                                                      }</span>
                                                  </td>
                                                  
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Địa chỉ: ${
                                                        order.address
                                                      }</span>
                                                  </td>
                                                  
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Số lượng sản phẩm: ${
                                                        listOrder.length
                                                      }</span
                                                    >
                                                  </td>
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Ngày đặt hàng: ${
                                                        todayDate
                                                      }</span
                                                    >
                                                  </td>
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    colspan="2"
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 30px 0px 10px;
                                                      box-sizing: border-box;
                                                    "
                                                  >
                                                    <span
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px;
                                                        box-sizing: border-box;
                                                      "
                                                      >Tổng tiền: ${new Intl.NumberFormat(
                                                        "de-DE",
                                                        {
                                                          style: "currency",
                                                          currency: "VND",
                                                        }
                                                      ).format(
                                                        total
                                                      )}</span
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            
                                            <table
                                              style="
                                                margin: 0px auto;
                                                padding: 20px 15px 20px 20px;
                                                width: 536px;
                                                border-top: 1px solid rgb(206, 206, 206);
                                              "
                                            >
                                              <tbody
                                                style="
                                                  margin: 0px auto;
                                                  padding: 0px;
                                                  box-sizing: border-box;
                                                "
                                              >
                                                <tr
                                                  style="
                                                    margin: 0px auto;
                                                    padding: 0px;
                                                    box-sizing: border-box;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      margin: 0px auto;
                                                      padding: 7px 0px;
                                                      box-sizing: border-box;
                                                      width: 497px;
                                                      font-size: 13px;
                                                      color: rgb(153, 153, 153);
                                                      text-align: center;
                                                    "
                                                  >
                                                    <a
                                                      href="http://localhost:3000/thanhtoan/${
                                                        order._id
                                                      }" onClick=""
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://www.luxstay.com/booking/payment?token%3DeyJpdiI6InM1MitBWTU1RU9RMjdhMUpKc3JBOUE9PSIsInZhbHVlIjoiYmYyYzMrMUhlcHhaSzR1aXdzc1hzVW1nOU5PNlhHUHFnU2txeDlvTU5xelJNMnV6ZllJYjZsZjJxQ3g5TmlJQU85WFJUb0ZHVVF2RTlvVTA2V2JIOVdqTnlsYW10b21GTHdXaGZxV0lic0kwdW1LbTFCK0thdlZDeHQ2QVo4OFdTeGJTaVo3eVR6UzlxcGhldERJS0VleFUzeGFlejlrMUxvTitcLzBoQjc3ND0iLCJtYWMiOiIzOGUzNjM5NTRhOTdjYzY2NjEzY2JiNjM5OTEzY2Q0MTYzZDQ4OGNkMDYyZjlmMWZjZDhmNDdmNTc4OTA1ZjEzIn0%3D&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNFG72CNSr5xCrNIk4Tg9pvidOKevQ"
                                                      style="
                                                        margin: 0px auto;
                                                        padding: 0px 20px;
                                                        box-sizing: border-box;
                                                        color: rgb(255, 255, 255);
                                                        text-decoration-line: none;
                                                        display: block;
                                                        line-height: 50px;
                                                        width: 347.891px;
                                                        min-height: 50px;
                                                        border-radius: 4px;
                                                        border: 0px;
                                                        font-weight: bold;
                                                        font-size: 18px;
                                                        background-color: rgb(244, 87, 16);
                                                      "
                                                      >Xác nhận ngay</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style="
                        margin: 0px auto;
                        padding: 0px;
                        width: 596px;
                        color: rgb(102, 102, 102);
                        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        height: 30px;
                      "
                    ></table>
                    <table
                      style="
                        margin: 0px auto;
                        padding: 0px;
                        width: 596px;
                        color: rgb(102, 102, 102);
                        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        background-color: rgb(235, 235, 235);
                      "
                    >
                      <tbody style="margin: 0px auto; padding: 0px; box-sizing: border-box">
                        <tr style="margin: 0px auto; padding: 0px; box-sizing: border-box">
                          <td
                            style="margin: 0px auto; padding: 0px; box-sizing: border-box"
                          >
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 25px;
                                width: 592px;
                                background-color: rgb(255, 255, 255);
                                text-align: center;
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    colspan="2"
                                    style="
                                      margin: 0px auto;
                                      padding: 7px 0px;
                                      box-sizing: border-box;
                                      font-size: 14px;
                                      text-align: left;
                                      color: rgb(51, 51, 51);
                                      line-height: 1.3;
                                    "
                                  >
                                    <a
                                      href="https://www.luxstay.com/"
                                      target="_blank"
                                      data-saferedirecturl="https://www.google.com/url?q=https://www.luxstay.com&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNGpRZEqWkIUDUBZB9s6dPSSPUmwpg"
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                        color: rgb(244, 87, 16);
                                        text-decoration-line: none;
                                      "
                                      >https://www.luxstay.com</a
                                    >- Trang web đặt căn hộ dịch vụ và biệt thự nghỉ dưỡng
                                    đầu tiên tại Việt Nam
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <a
                                      href="tel:labels.home.phone"
                                      class="m_6425257584780622054mobile-font-16"
                                      target="_blank"
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                        text-decoration-line: none;
                                        font-size: 18px;
                                      "
                                    >
                                      <div
                                        class="m_6425257584780622054mobile-block"
                                        style="
                                          margin: 0px 15px 0px auto;
                                          padding: 10px 0px;
                                          box-sizing: border-box;
                                          display: inline-block;
                                          color: inherit;
                                          height: 50px;
                                          vertical-align: middle;
                                        "
                                      >
                                        <img
                                          src="https://ci6.googleusercontent.com/proxy/P0oa5RVd3Y2ueDZhu9J6h4GFT7pZH_eBCNaS2A0vS2IGq8fCucNNfUxgltGfQJiY8Eby0bhGlRVgLMqfr2GW-PK783dD11c=s0-d-e1-ft#https://api.luxstay.com/images/emails/icon-phone.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          "
                                        />
                                      </div>
                                      18006586 (miễn phí)
                                    </a>
                                  </td>
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <a
                                      href="mailto:info@luxstay.com"
                                      class="m_6425257584780622054mobile-font-16"
                                      target="_blank"
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                        text-decoration-line: none;
                                        font-size: 18px;
                                      "
                                    >
                                      <div
                                        class="m_6425257584780622054mobile-block"
                                        style="
                                          margin: 0px 15px 0px auto;
                                          padding: 10px 0px;
                                          box-sizing: border-box;
                                          display: inline-block;
                                          color: inherit;
                                          height: 50px;
                                          vertical-align: middle;
                                        "
                                      >
                                        <img
                                          src="https://ci4.googleusercontent.com/proxy/GCuFK3GLzanK8qNbEllg4ZPJxa-ytL0DVHwXT3BLrB3p4VReWBmVPr7wak5kMO0E5osA6cBqAQ9_9_Yz-JNMAmyG5NxHK6Q=s0-d-e1-ft#https://api.luxstay.com/images/emails/icon-email.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          "
                                        />
                                      </div>
                                      info@luxstay.com
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 20px 25px 0px;
                                width: 592px;
                                text-align: center;
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 7px 0px;
                                      box-sizing: border-box;
                                      font-size: 13px;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >About us</a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >|</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >Terms</a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >|</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >Privacy</a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >|</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >Help</a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >|</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://mail.google.com/mail/u/2/#m_6425257584780622054_"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >Contact</a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 0px 25px;
                                width: 592px;
                                text-align: center;
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 7px 0px;
                                      box-sizing: border-box;
                                      font-size: 13px;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >Stay up to date with our latest news &amp;
                                      features</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 0px 25px;
                                width: 592px;
                                text-align: center;
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px;
                                      box-sizing: border-box;
                                      font-size: 13px;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://www.facebook.com/luxstay/"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/luxstay/&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNHYIJkGoD-f1jyPUAdE9dzyvH8OcQ"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >&nbsp;<img
                                          src="https://ci6.googleusercontent.com/proxy/oe4TtCe9yEEuQWMMLvXKHQnEz0k4Ie-0rHFjr7FjV_RVRRJtsv7cE7HKEtiddkz68QwrzIqwE4S3vDzzBCmdS1oZSRXR8SU18acpWg=s0-d-e1-ft#https://api.luxstay.com/images/emails/social-facebook.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          " /></a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://twitter.com/luxstay"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/luxstay&amp;source=gmail&amp;ust=1627895921447000&amp;usg=AFQjCNGhZVc8hwW9XD9pe4J5LD4GTaj0DQ"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >&nbsp;<img
                                          src="https://ci4.googleusercontent.com/proxy/QrLNtL-xSaYgI3BbzsZv-vSU0Bq6eSyVF_AKmENEudSDlU4zDOy5u0WZoLhFH2jChodwmtxGN_-r1rPbX7kCzatPQELTB3_slo_W=s0-d-e1-ft#https://api.luxstay.com/images/emails/social-twitter.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          " /></a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://www.youtube.com/c/homestaytv"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/c/homestaytv&amp;source=gmail&amp;ust=1627895921448000&amp;usg=AFQjCNEObcpuNJyj6-5CnHdGjg1FQrMDgQ"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >&nbsp;<img
                                          src="https://ci3.googleusercontent.com/proxy/7JqVgvJGxBG3Nl_6D9PPpotVOkCBErbczMOSsd3TODwIR918Fdyt5gDC49DE-mnpMgToddf6pmeozWNLToOUCvGY5fophFaMZ6nZ=s0-d-e1-ft#https://api.luxstay.com/images/emails/social-youtube.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          " /></a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >&nbsp;<span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >&nbsp;&nbsp;&nbsp;<a
                                        href="https://www.instagram.com/luxstayofficial/"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/luxstayofficial/&amp;source=gmail&amp;ust=1627895921448000&amp;usg=AFQjCNHInipEfCDKCxpiUxfqWekFIbC3iQ"
                                        style="
                                          margin: 0px auto;
                                          padding: 0px;
                                          box-sizing: border-box;
                                          color: rgb(17, 85, 204);
                                          text-decoration-line: none;
                                        "
                                        >&nbsp;<img
                                          src="https://ci5.googleusercontent.com/proxy/taKUnKcZjXPeme7wd8tmhqhJcj24WHtBrndb0_4Z0RQxr9ASad1PUsJXX70-VxjY_0YeAmU3Bkn7c3U-FB1LXZPiF6QdU0MqlUjkQ0Y=s0-d-e1-ft#https://api.luxstay.com/images/emails/social-instagram.png"
                                          class="CToWUd"
                                          style="
                                            margin: 0px auto;
                                            padding: 0px;
                                            box-sizing: border-box;
                                            max-width: 100%;
                                            height: auto;
                                          " /></a
                                      >&nbsp;&nbsp;&nbsp;</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="m_6425257584780622054mobile-padding"
                              style="
                                margin: 0px auto;
                                padding: 10px 25px 0px;
                                width: 592px;
                                text-align: center;
                                font-size: 13px;
                              "
                            >
                              <tbody
                                style="
                                  margin: 0px auto;
                                  padding: 0px;
                                  box-sizing: border-box;
                                "
                              >
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px 0px 5px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >Thư này được gửi tự động bởi hệ thống. Vui lòng không
                                      trả lời</span
                                    >
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px 0px 5px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >Luxstay Pte. Ltd.</span
                                    >
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0px auto;
                                    padding: 0px;
                                    box-sizing: border-box;
                                  "
                                >
                                  <td
                                    style="
                                      margin: 0px auto;
                                      padding: 0px 0px 5px;
                                      box-sizing: border-box;
                                    "
                                  >
                                    <span
                                      style="
                                        margin: 0px auto;
                                        padding: 0px;
                                        box-sizing: border-box;
                                      "
                                      >10 Anson Road, #22-02 International Plaza, Singapore
                                      079903</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </body>
            </html>
            `,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
      }
    });
    await order.save()
    return order;
  },
  getOrders: async ({email}) => {
    if(email){
      return await Order.find({ email: email})
    }else{
      return await Order.find()
    }
  },
  getOrderById: async (id) => await Order.findById(id),
  updateStatusOrder: async ({id, status}) => {
    const BookUpdateConditions = { _id: id };
    return await Order.findOneAndUpdate(BookUpdateConditions, {status: status + 1}, {
      new: true,
    });
  },
  deleteStatusOrder : async ({id}) => {
    const BookUpdateConditions = { _id: id };
    return await Order.findOneAndUpdate(BookUpdateConditions, {status: 5}, {
      new: true,
    });
  },
  danhGiaOrder: async ({id, comments, danhgia}) => {
    const BookUpdateConditions = { _id: id };
    return await Order.findOneAndUpdate(BookUpdateConditions, {comments, danhgia}, {
      new: true,
    });
  },
  login : async ({email, name}) => {
    const user = await User.findOne({ email: email, name: name})
    if(user){
      return user
    }else{
      return false
    }
  }
};

module.exports = mongooseDataMethods;
