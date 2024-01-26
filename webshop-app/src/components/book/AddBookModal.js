import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../css/Modal.css";
import { BASE_URL } from "../../Constants";

function AddBookModal({ getBooks, ...props }) {
    const [bookToAdd, setBookToAdd] = useState({
        name: "",
        author: "",
        category: "",
        publishing_house: "",
        image: "new_book.png"
    });
    const [validated, setValidated] = useState(false);

    const handleChangeAddBooks = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setBookToAdd({ ...bookToAdd, [name]: value });
    };

    const addBook = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity()) {
            fetch(`${BASE_URL}/Book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookToAdd)
            }).then((data) => {
                if (data.status === 200) {
                    getBooks();
                    props.onHide();
                } else {
                    console.log("error");
                }
            });
        }
        setValidated(true);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    id="new-book-container"
                    className="new-book hide d-flex justify-content-center flex-column align-items-center text-left"
                >
                    <Form
                        onSubmit={(e) => addBook(e)}
                        className="new-book-form"
                        noValidate
                        validated={validated}
                    >
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="validationCustom01"
                        >
                            <Form.Label column sm="3">
                                Category*
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    name="category"
                                    defaultValue={props.category}
                                    onChange={handleChangeAddBooks}
                                    placeholder="ex. : Science Fiction"
                                    aria-label="ex. : Science Fiction"
                                    pattern="^[\w\-\s\,]+$"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid book category.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="validationCustom01"
                        >
                            <Form.Label column sm="3">
                                Name*
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    name="name"
                                    type="text"
                                    defaultValue={props.name}
                                    onChange={handleChangeAddBooks}
                                    placeholder="ex. : The Lord Of The Rings"
                                    aria-label="ex. : The Lord Of The Rings"
                                    aria-describedby="basic-addon1"
                                    pattern="^[\w\-\s\,]+$"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid book name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="validationCustom01"
                        >
                            <Form.Label column sm="3">
                                Author*
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    name="author"
                                    type="text"
                                    defaultValue={props.author}
                                    onChange={handleChangeAddBooks}
                                    placeholder="ex. : J. R. R. Tolkien"
                                    aria-label="ex. : J. R. R. Tolkien"
                                    aria-describedby="basic-addon1"
                                    pattern="(^[a-zA-Z]{1,16})(\.{0,1})([ ]{0,1})([a-zA-Z]{1,16})(\.{0,1})([ ]{0,1})([a-zA-Z]{0,26})"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid book author.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="validationCustom01"
                        >
                            <Form.Label column sm="3">
                                Publisher*
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    name="publishing_house"
                                    type="text"
                                    defaultValue={props.publishing_house}
                                    onChange={handleChangeAddBooks}
                                    placeholder="ex. : Orion, Rao"
                                    aria-label="ex. : Orion, Rao"
                                    aria-describedby="basic-addon1"
                                    pattern="^[\w\-\s\,]+$"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Invalid book publishing house.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="add-new-buttons d-flex justify-content-between">
                    <Button variant="danger" onClick={addBook}>
                        Add
                    </Button>
                    <Button onClick={props.onHide}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default AddBookModal;
