import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import modalReducer from './features/cart/modelSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer
  },
})
// store là object chúa các reducer với key là tên reducer và value là reducer

// "Action" có thể được dịch là "Hành động" hoặc "Sự kiện" - Đây là một đối tượng chứa thông tin về sự kiện đã xảy ra. Trong Redux, action thường được gửi từ ứng dụng đến store để mô tả sự thay đổi mong muốn trong trạng thái của ứng dụng.

// "Reducer" có thể được dịch là "Hàm giảm" hoặc "Hàm giảm chức năng" - Đây là một hàm có nhiệm vụ xử lý action và trả về một phiên bản mới của trạng thái ứng dụng. Reducer thực hiện việc giảm độ phức tạp của trạng thái bằng cách xử lý các action và trả về trạng thái mới.
