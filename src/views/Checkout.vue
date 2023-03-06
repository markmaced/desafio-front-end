<template>
    <div id="checkout" class="checkout">
        <div class="container mt-5 form-checkout">
            <div class="row">
                <div class="form-group mt-md-4 mt-3 col-md-6">
                    <label>Nome*</label>
                    <input type="text" class="form-control" v-model="credentials.name">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-6">
                    <label>CEP*</label>
                    <input type="number" class="form-control" v-model="credentials.cep" v-on:keyup="searchCep()" v-maska data-maska="########">
                </div>
            </div>
            <div class="row">
                <div class="form-group mt-md-4 mt-3 col-md-6">
                    <label>Email*</label>
                    <input type="email" class="form-control" v-model="credentials.email">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-4">
                    <label>Endereço</label>
                    <input type="text" class="form-control" v-model="credentials.address">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-2">
                    <label>Número*</label>
                    <input type="number" class="form-control" v-model="credentials.number_address">
                </div>
            </div>
            <div class="row">
                <div class="form-group mt-md-4 mt-3 col-md-6">
                    <label>CPF*</label>
                    <input type="email" class="form-control" v-model="credentials.cpf" v-maska data-maska="###.###.###-##">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-3">
                    <label>Complemento*</label>
                    <input type="text" class="form-control" v-model="credentials.complement">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-3">
                    <label>Bairro*</label>
                    <input type="text" class="form-control" v-model="credentials.neighborhood">
                </div>
            </div>
            <div class="row">
                <div class="form-group mt-md-4 mt-3 col-md-3">
                    <label>Data de nascimento*</label>
                    <input type="date" class="form-control" v-model="credentials.birthday">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-3">
                    <label>Telefone*</label>
                    <input type="text" class="form-control" v-model="credentials.tel" v-maska data-maska="(##) #####-####">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-4">
                    <label>Cidade*</label>
                    <input type="text" class="form-control" v-model="credentials.city">
                </div>
                <div class="form-group mt-md-4 mt-3 col-md-2">
                    <label>Estado*</label>
                    <input type="text" class="form-control" v-model="credentials.state">
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end mt-4">
                <div class="col-md-4 col-12 mb-md-0 mb-3 d-flex justify-content-end">
                    <button type="button" class="checkout-btn" @click="formValidate()">Concluir compra</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { vMaska } from "maska"
export default {
    directives: { maska: vMaska },
    data(){
        return{
            credentials: {
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
            },
            data : {
                cep : null,
                data : null,
                messageCep: null
            },
        }
    },
    methods:{
        searchCep () {        
            if(this.credentials.cep.toString().length == 8){
                axios.get(`https://viacep.com.br/ws/${ this.credentials.cep }/json/`).then((response) => {
                    this.data = response.data
                    this.credentials.address = response.data.logradouro
                    this.credentials.city = response.data.localidade
                    this.credentials.neighborhood = response.data.bairro
                    this.credentials.state = response.data.uf
                })
            }
		},
        formValidate(){
            for(var i = 0; i < Object.keys(this.credentials).length; i++){
                if(Object.values(this.credentials)[i] == ''){
                    this.$swal({
                        title: 'Erro!',
                        timer: 2500,
                        text: 'Preencha todos os campos',
                        showDenyButton: false,
                        showConfirmButton: true,
                        icon: 'error'
                    })
                    return false
                }else{
                    this.$store.commit('registerUser' , this.credentials)
                    this.$swal({
                        title: 'Obrigado '+this.credentials.name+'!',
                        text: 'Pedido realizado!',
                        showDenyButton: false,
                        showConfirmButton: true,
                        icon: 'success'
                    })
                    this.$router.push('/');
                    this.$store.commit('setClearCart')
                }
            }
        },
        loggedUser(){
            if(this.$store.state.user.userData){
                this.credentials.name = this.$store.state.user.userData.name
                this.credentials.cep = this.$store.state.user.userData.cep
                this.credentials.email = this.$store.state.user.userData.email
                this.credentials.address = this.$store.state.user.userData.address
                this.credentials.number_address = this.$store.state.user.userData.number_address
                this.credentials.cpf = this.$store.state.user.userData.cpf
                this.credentials.birthday = this.$store.state.user.userData.birthday
                this.credentials.complement = this.$store.state.user.userData.complement
                this.credentials.neighborhood = this.$store.state.user.userData.neighborhood
                this.credentials.tel = this.$store.state.user.userData.tel
                this.credentials.city = this.$store.state.user.userData.city
                this.credentials.state = this.$store.state.user.userData.state
            }
        }
    },
    mounted(){
        this.loggedUser()
    }
}
</script>

<style lang="scss">
#checkout{
    .form-checkout{
        min-height: 100vh;
        .checkout-btn{
            background: #8E36B7;
            width: 100%;
            padding: 10px;
            text-align: center;
            color: #fff;
            text-decoration: none;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 500;
            transition: 0.5s;
            display: block;
            border: 1px solid #8E36B7;
            &:hover{
                background: transparent;
                color: #434343;
                transition: 0.5s;
            }
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
        }
    }
}
</style>