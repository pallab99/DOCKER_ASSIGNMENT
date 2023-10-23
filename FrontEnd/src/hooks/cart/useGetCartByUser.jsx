import { useEffect, useState } from "react";
import CartApi from "../../api/CartApi";
import { isUser } from "../../helper/tokenAuthorizer";

const useGetCartByUser = (count, token) => {
  const [cartData, setCartData] = useState([]);
  const [beforeDiscount, setBeforeDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noCartData, setNoCartData] = useState(false);
  const [cartId, setCardId] = useState("");
  useEffect(() => {
    const getCartByUser = async () => {
      try {
        setLoading(true);
        const res = await CartApi.cartByUser();
        const cartId = res?.data?.data?.cartExistsForUser?._id;
        const books = res?.data?.data?.cartExistsForUser?.books;
        const beforeDiscount = res?.data?.data?.beforeDiscount || 0;
        const afterDiscount = res?.data?.data?.afterDiscount || 0;

        setCartData(books);
        setBeforeDiscount(beforeDiscount);
        setTotalAmount(afterDiscount);
        setCardId(cartId);
        setLoading(false);
        setNoCartData(false);
      } catch (error) {
        console.error("Error fetching cart by user:", error);
        setCartData([]);
        setTotalAmount(0);
        setLoading(false);
        setNoCartData(true);
      }
    };
    if (token && isUser(token)) {
      getCartByUser();
    }
  }, [count, token]);

  return { cartData, totalAmount, beforeDiscount, loading, noCartData, cartId };
};

export default useGetCartByUser;
