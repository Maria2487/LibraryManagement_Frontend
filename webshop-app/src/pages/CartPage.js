import Container from "react-bootstrap/esm/Container";
import "../css/CartPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import OrderSummary from "../components/cart/OrderSummary";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { BASE_URL } from "../Constants";

function CartPage() {
    const orderList = JSON.parse(localStorage.getItem("items"));
    const userId = localStorage.getItem("user_id");
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [cartItems, setCartItems] = useState([]);

    const changeQuantity = (id, type) => {
        let isIncrease = type === "increase" ? true : false;
        let array = [...cartItems];
        const cartItemIndex = array.findIndex((item) => item.id === id);
        let condition = isIncrease
            ? array[cartItemIndex].quantity < 5
            : array[cartItemIndex].quantity > 1;
        let toastMessage = isIncrease
            ? "You have exceeded the maximum quantity available for this product."
            : "You can remove items by clicking on the trash icon.";

        if (condition) {
            if (isIncrease) {
                setCartItemsNumber(cartItemsNumber + 1);
            } else {
                setCartItemsNumber(cartItemsNumber - 1);
            }
            array[cartItemIndex].quantity = isIncrease
                ? array[cartItemIndex].quantity + 1
                : array[cartItemIndex].quantity - 1;
            setCartItems(array);
            let orders = array.map((item) => arrayToLocalStorage(item));
            localStorage.setItem("items", JSON.stringify(orders));
        } else {
            setError(true);
            setErrorMessage(toastMessage);
            setShow(true);
        }
    };

    const deleteCartItem = (idToDelete) => {
        let array = [...cartItems];
        let foundIndex = array.findIndex((item) => item.id === idToDelete);
        let quantity = array[foundIndex].quantity;
        if (foundIndex !== -1) {
            array.splice(foundIndex, 1);
            if (array.length > 0) {
                const orders = array.map((item) => arrayToLocalStorage(item));
                localStorage.setItem("items", JSON.stringify(orders));
            } else {
                localStorage.removeItem("items");
            }
            setCartItems(array);
            setCartItemsNumber(cartItemsNumber - quantity);
        }
    };

    const arrayToLocalStorage = ({ id, name, quantity }) => ({
        id,
        name,
        quantity
    });

    useEffect(() => {
        if (orderList) {
            const orders = orderList.map((item) => ({
                ...item,
                id: item.id
            }));
            setCartItems(orders);
            let counter = 0;
            for (let i = 0; i < orderList.length; i++) {
                counter = counter + orderList[i].quantity;
            }
            setCartItemsNumber(counter);
        }
    }, []);

    //no items in cart
    if (!orderList || orderList.length === 0) {
        return (
            <>
                <NavbarComponent cartItemsNumber={cartItemsNumber} />
                <Container className="mt-5 pt-5 text-center">
                    <h4>Your list is empty</h4>
                    <Link to="/books">Continue looking</Link>
                </Container>
                <div className="cart-footer">
                    <FooterComponent />
                </div>
            </>
        );
    }

    const orderSummary = (
        <OrderSummary
            cartItems={cartItems}
            changeQuantity={changeQuantity}
            deleteCartItem={deleteCartItem}
        />
    );

    return (
        <>
            <NavbarComponent cartItemsNumber={cartItemsNumber} />
            <ToastContainer className="p-3 bottom-0 end-0">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    {error ? (
                        <>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto text-danger">
                                    Error!
                                </strong>
                            </Toast.Header>
                            <Toast.Body>{errorMessage}</Toast.Body>
                        </>
                    ) : (
                        <>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto text-success">
                                    Success!
                                </strong>
                            </Toast.Header>
                            <Toast.Body>Your ordered!</Toast.Body>
                        </>
                    )}
                </Toast>
            </ToastContainer>
            <Container className="mt-5 pt-5 text-center">
                {orderSummary}
            </Container>
            <FooterComponent />
        </>
    );
}

export default CartPage;
