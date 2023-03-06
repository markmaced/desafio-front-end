var cartInfos = {
    items: [],
    total : 0
}

export default{
    state:{
        cartData: cartInfos
    },
    mutations:{
      setClearCart (state) {
          state.cartData = {
            items: [],
            total: 0
          }
          state.response = null
      },
      setCartItem (state, data) {
          if (state.cartData.items.length === 0 || Object.keys(state.cartData.items).length === 0) {
            state.cartData.items = []
          }
          if(state.cartData.items.length != 0){
            let i = ''
            let id = ''
            state.cartData.items.forEach(function(item , index){
              if(item.id == data.id){
                 id = item.id
                 i = index
              }
            })
            if(i >= 0 && id == data.id){
              state.cartData.items[i].quantity = state.cartData.items[i].quantity + 1
            }else{
              state.cartData.items.push(data)
            }
          }else{
            state.cartData.items.push(data)
          }
      },
      removeItem (state, data) {
        state.cartData.items.forEach(function(item , index){
            item.id == data ? state.cartData.items.splice(index , 1) : false
        })
      },
      calculateCartTotal(state , data){
        let subtotal = []
        let total = 0
        let quantity = 1
        data.forEach(function(item){
            subtotal.push(parseFloat(item.price * item.quantity))
        })
        for(var i = 0; i < subtotal.length; i++){
          total += subtotal[i]
        }
        state.cartData.total = total
      },
      productQuantity(state , data){
        state.cartData.items.forEach(function(item){
          if(item.id == data.id){
            item.quantity = data.quantity
          }
        })
      },
    }
}