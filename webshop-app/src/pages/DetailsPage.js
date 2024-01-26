import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaStar, FaRegStar } from "react-icons/fa";

import "../css/BookDetails.css";
import { BASE_URL } from "../Constants";

function DetailsPage() {
  const [book, setBook] = useState(null);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [show, setShow] = useState(false);
  let rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    const bookId = "4ee53ffa-3e1a-490c-6fcf-08dc1e70486e"; // Replace with actual book ID
    axios.get(`${BASE_URL}/Book/${bookId}`).then((response) => {
      setBook(response.data);
    });

    const cartItems = JSON.parse(localStorage.getItem("items"));
    let counter = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        counter = counter + cartItems[i].quantity;
      }
      setCartItemsNumber(counter);
    }
  }, []);

  const handleAddToCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem("items"));
    if (cartItems) {
      let count = 0;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
          cartItems[i].quantity += 1;
          count += 1;
        }
      }
      if (count < 1) {
        cartItems.push({
          id: id,
          name: book.title,
          price: book.price,
          quantity: 1,
        });
      }
      setCartItemsNumber(cartItemsNumber + 1);
      localStorage.setItem("items", JSON.stringify(cartItems));
    } else {
      const items = [
        {
          id: id,
          name: book.title,
          price: book.price,
          quantity: 1,
        },
      ];
      localStorage.setItem("items", JSON.stringify(items));
      setCartItemsNumber(cartItemsNumber + 1);
    }
    setShow(true);
  };

  return (
    <>
      <NavbarComponent cartItemsNumber={cartItemsNumber} />
      <>
        <Breadcrumbs />
        {book ? (
          <div className="container container-footer" id="container">
            <div className="title mt-3">
              <h4 className="title details-title" id="name">
                {book.title}
              </h4>
              <h5 className="details-author text-danger" id="author">
                {book.authors[0].fullName}
              </h5>
            </div>
            <div className="container container-details mt-3">
              <div className="row">
                <div className="col-sm-6 col-12" id="book-img">
                  <img
                    className="book-details-img"
                    src={"/images/" + book.coverPhoto}
                    alt="Book cover"
                  ></img>
                </div>
                <div
                  className="details col-sm-6 col-12 align-self-center"
                  id="book-details"
                >
                  <h5>
                    Publishing house :{" "}
                    <span className="detail-value">{book.publisher.name}</span>
                  </h5>
                  <h5>
                    Available from date :{" "}
                    <span className="detail-value">
                      {book.publishDate}
                    </span>
                  </h5>
                  <h5>
                    In stock :
                    <span className="detail-value">
                      {book.status === 1 ? " YES" : " NO"}
                    </span>
                  </h5>
                  {book.status === 1 ? (
                    <button
                      id="add-to-cart"
                      className="text-center btn btn-outline-danger mt-3"
                      onClick={() => handleAddToCart(book.id)}
                    >
                      Add to favorites
                    </button>
                  ) : (
                    <button
                      id="add-to-cart"
                      className="text-center btn btn-outline-danger mt-3"
                      onClick={() => handleAddToCart(book.id)}
                      disabled
                    >
                      Add to favorites
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <ToastContainer className="p-3 top-0 end-0">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            bg="danger"
          >
            <Toast.Body>Book added to favorites!</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="details-footer">
          <FooterComponent />
        </div>
      </>
    </>
  );
}

export default DetailsPage;