import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'
import createPersistedState from 'vuex-persistedstate'


export default new Vuex.Store({
    modules: {
        cart,
        user
      },

      plugins: [createPersistedState()]
})