import React from "react";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import Button from "react-bootstrap/esm/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { BASE_URL } from "../../Constants";

function Book({
    id,
    name,
    author,
    category,
    image,
    publishing_house,
    date,
    getBooks,
    isAdmin,
    cartItemsNumber,
    setCartItemsNumber
}) {
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [show, setShow] = useState(false);

    const deleteBook = () => {
        fetch(`${BASE_URL}/Book/${id}`, {
            method: "DELETE"
        }).then((data) => {
            if (data.status === 200) {
                getBooks();
            }
        });
    };

    const handleAddToCart = (id) => {
        // addToFavorites logic
        setShow(true);
    };

    return (
        <>
            <ToastContainer className="p-3 top-0 end-0">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>Book added to favorites!</Toast.Body>
                </Toast>
            </ToastContainer>
            <DeleteBookModal
                deleteBook={deleteBook}
                onHide={() => setDeleteModalShow(false)}
                show={deleteModalShow}
            />
            <EditBookModal
                id={id}
                category={category}
                name={name}
                author={author}
                publishing_house={publishing_house}
                date={date}
                image={image}
                show={editModalShow}
                getBooks={getBooks}
                onHide={() => setEditModalShow(false)}
            />
            <div className="book-card col-lg-3 col-md-4 col-sm-6 col-12 g-3">
                {isAdmin && (
                    <div
                        className="action-buttons d-flex justify-content-end"
                        id={id}
                    >
                        <button
                            className="edit-btn"
                            onClick={() => setEditModalShow(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#confirm-delete"
                            onClick={() => setDeleteModalShow(true)}
                        >
                            Delete
                        </button>
                    </div>
                )}
                <div className="book-img d-flex justify-content-center align-items-center">
                    <img src={"/images/" + image} alt="Book cover" />
                </div>
                <div className="book-info">
                    <h4 className="book-name">{name}</h4>
                    <p className="author">{author}</p>
                    
                    <div className="actionButtons">
                        <LinkContainer to={"/books/" + id}>
                            <Button variant="danger">See details &gt;</Button>
                        </LinkContainer>
                        <button
                            className="add-to-cart text-center btn btn-danger mt-2"
                            onClick={() => handleAddToCart(id)}
                            disabled={cartItemsNumber === 0}
                        >
                            Add to favorites
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Book;