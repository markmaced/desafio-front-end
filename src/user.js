var userInfos = {
    name: '',
    cep: '',
    email: '',
    address: '',
    number_address: '',
    cpf: '',
    birthday: '',
    complement: '',
    neighborhood: '',
    tel: '',
    city: '',
    state: ''
}

export default{
    state:{
        userData: userInfos
    },
    mutations:{
        registerUser(state , data){
            state.userData = data
        }
    }
}