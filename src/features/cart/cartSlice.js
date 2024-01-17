import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url)

      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

// khởi tạo state
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

// tạo slice và đưa vào state và các reducer(gồm những hàm thực thi)
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const ItemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== ItemId)
    }, // action là argument truyền vào
    increase: (state, action) => {
      const ItemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === ItemId)
      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const ItemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === ItemId)
      if (cartItem.amount > 0) cartItem.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += Number(item.price) * item.amount
      })
      state.amount = amount
      state.total = total.toFixed(2)
    },
    /**
     * Các parameter
     * - state: là trạng thái hiện tại của cartSlice có thể dùng để truy cấp vào những
     * giá trị hiện tại như cartItems (Không thể log ra để xem giá trị bên trong của state)
     * action
     * - action: gồm payload chứa các giá trị của argument truyền vào khi gọi hàm và
     * type gồm tên state/hàm được gọi ví dụ: cart/decrease
     */
  },
  extraReducers: (builder) => { // gồm 3 trạng thái của function
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false
        console.log(action);
      })
  },
})
console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer

// ----Note----
// Trong Redux, tính chất pure của reducers rất quan trọng để đảm bảo dự đoán và dễ kiểm soát trạng thái của ứng dụng. Một reducer được coi là "pure" nếu nó đáp ứng hai yếu tố chính:

// Không Thay Đổi Trực Tiếp Trạng Thái (State): Reducer không thể thay đổi trực tiếp trạng thái hiện tại mà phải trả về một trạng thái mới.

// Không Gây Ảnh Hưởng Bên Ngoài (No Side Effects): Reducer không thể gây ảnh hưởng bất kỳ đối tượng nào bên ngoài nó, bao gồm cả việc in ra log.

// Khi bạn sử dụng console.log(state) trong reducers, bạn đang thực hiện một "side effect" vì nó làm thay đổi hành vi của hàm, không phải chỉ làm thay đổi trạng thái. Các side effect không được phép trong reducers theo quy tắc của Redux.
