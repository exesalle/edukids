import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state);

    return (
        <>
            {cart.length > 0 ? (
                <>

                    {cart.map((item) => {
                        return <CartItem />;
                    })}


                </>
            ) : (
                <>

                    <h1>
                        Your cart is empty!
                    </h1>
                    <Link to={"/"}>
                        <button >
                            SHOP NOW
                        </button>
                    </Link>
                </>
            )}
        </>
    );
};

export {Cart};
