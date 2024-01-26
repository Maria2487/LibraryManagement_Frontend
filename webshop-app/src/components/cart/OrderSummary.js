import CartItem from "./CartItem";
import DeleteItemModal from "./DeleteItemModal";
import { useState } from "react";
function OrderSummary({
  cartItems,
  changeQuantity,
  deleteCartItem,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const showDeleteModal = (id) => {
    setModalShow(true);
    setIdToDelete(id);
  };
  const deleteCartItemAndModalClose = () => {
    deleteCartItem(idToDelete);
    setModalShow(false);
  };
  return (
    <>
      {" "}
      <div className="section-title">
        <span className="section-number">1</span>
        <h3>Favorite list</h3>
      </div>
      <div className="order">
        {cartItems.map((order) => {
          return (
            <CartItem
              key={order.name}
              cartItem={order}
              changeQuantity={changeQuantity}
              showDeleteModal={showDeleteModal}
            />
          );
        })}

      </div>
      <DeleteItemModal
        deleteCartItemAndModalClose={deleteCartItemAndModalClose}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="invalid bg-danger mt-5 d-none text-center">
        <p className="text-white p-3">
          An error occurred! Please check the addresses you entered.
        </p>
      </div>
    </>
  );
}

export default OrderSummary;
