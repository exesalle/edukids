import React from "react";
import { add, remove } from "../store/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Product = ({ item }) => {
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = () => {
    dispatch(add(item));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };


  return (

      <div>
        {cart.some((p) => p.id === item.id) ? (
            <button>
              УЖЕ КУПЛЕНО
            </button>
        ) : (
            <button onClick={addToCart}>
              Add to cart
            </button>
        )}
        <p>${item.price}</p>
      </div>

  );
};

export default Product;