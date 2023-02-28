import React from "react";

import { remove } from "../store/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const CartItem = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <>

            <h1>
              fgfhff
            </h1>

    </>
  );
};

export default CartItem;
