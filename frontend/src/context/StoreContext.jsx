import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const url = "https://night-canteen-server.vercel.app"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    async function addToCart(itemId) {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev, [itemId]:1}))
        } else {
            setCartItems((prev)=> ({...prev, [itemId]: prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId}, {headers:{token}})
        }
    }

    async function removeFromCart(itemId) {
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId]-1}))

        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId}, {headers:{token}})
        }
    }

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    async function fetchFoodList() {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{}, {headers:{token}})
        setCartItems(response.data.cartData)
    }
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem('zestHeavenToken')){
                await loadCartData(localStorage.getItem('zestHeavenToken'))
                setToken(localStorage.getItem('zestHeavenToken'))
            }
        }
        loadData()
    },[])
    function getTotalCartAmount() {
        let totalAmount = 0;
        for(const item  in cartItems){
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=> product._id===item)
                totalAmount = totalAmount + itemInfo.price*cartItems[item]
            }
        }
        return totalAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider