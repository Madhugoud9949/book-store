import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { itemContext } from "../context/ItemContext";
import './style.css'

const Header = () => {
    const { itemsInCart, totalPrice } = useContext(itemContext);

    return (
        <div className="header">
            <h1 className="gfg">Book Store</h1>
            <h3 style={{ color: "green" }}>Total Price: ${totalPrice.toFixed(2)}</h3>
            <div className="cart-num">
                <div className="cart-items">{itemsInCart}</div>
                <FontAwesomeIcon icon={faCartShopping} size="4x" />
            </div>
        </div>
    );
};

export default Header;
