import { createContext, useEffect, useState } from "react";
import '../style.css'
// Create item context
const itemContext = createContext();

// Custom provider component
function CustomItemContext({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch products from the backend
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/books");
            const products = await response.json();
            setProducts(products);
        };

        fetchData();
    }, []);

    // Load cart state from local storage on initial render
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
        setItemsInCart(savedCart.length);
        setTotalPrice(savedCart.reduce((total, item) => total + item.price, 0));
    }, []);

    // Save cart state to local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setTotalPrice(totalPrice + product.price);
        setCart([...cart, product]);
        setItemsInCart(itemsInCart + 1);
        alert(`Added ${product.title} to the cart!`);
    };

    const removeFromCart = (product) => {
        const index = cart.findIndex((prdt) => prdt._id === product._id);

        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setTotalPrice(totalPrice - cart[index].price);
            setCart(updatedCart);
            setItemsInCart(itemsInCart - 1);
            alert(`Removed ${product.title} from the cart!`);
        } else {
            console.log("Item not found in the cart");
        }
    };

    return (
        <itemContext.Provider
            value={{
                products,
                addToCart,
                removeFromCart,
                itemsInCart,
                totalPrice,
            }}
        >
            {children}
        </itemContext.Provider>
    );
}

export { itemContext };
export default CustomItemContext;
