<template>
    <div id="carrinho" class="carrinho">
        <div class="table-cart container mt-5" v-if="this.$store.state.cart.cartData.items.length > 0">
            <div class="col-12 table-row table-header">
                <div class="row d-md-flex d-none">
                    <div class="col-3 table-title">
                        <p>Produtos</p>
                    </div>
                    <div class="col-3 table-title">
                        <p>Quantidade</p>
                    </div>
                    <div class="col-3 table-title">
                        <p>Valor unitário</p>
                    </div>
                    <div class="col-3 table-title">
                        <p>Total</p>
                    </div>
                </div>
            </div>
            <div class="col-12 table-row table-body" v-for="(cartItem) in this.$store.state.cart.cartData.items" v-bind:key="cartItem.id">
                <div class="row align-items-center">
                    <div class="col-md-3 col-12">
                        <div class="row align-items-center">
                            <div class="col-md-2 col-3">
                                <button type="button" class="remove-product" @click="removeProduct(cartItem.id)">
                                    <BootstrapIcon icon="trash-fill"/>
                                </button>
                            </div>
                            <div class="col-md-6 col 9">
                                <p class="cart-categories">{{cartItem.category}}</p>
                                <p class="cart-product-title">{{cartItem.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-12">
                        <div class="quantity-btn text-center mb-md-0 mb-3">
                            <button type="button" id="quantity-sub" @click="productQuantity('sub' , cartItem.id)">-</button>
                            <input type="text" :value="cartItem.quantity" disabled />
                            <button type="button" id="quantity-sum" @click="productQuantity('sum' , cartItem.id)">+</button>
                        </div>
                    </div>
                    <div class="col-md-3 col-12 d-md-block d-none">
                        <p class="cart-product-price">{{this.formatPrice(cartItem.price)}} <span>à vista</span></p>
                        <p class="parcel">Ou 10x de {{this.formatPrice(cartItem.price / 10 )}}</p>
                    </div>
                    <div class="col-md-3 col-12">
                        <p class="cart-product-price">{{calculateProductTotal(cartItem.id)}} <span>à vista</span></p>
                        <p class="parcel">Ou 10x de {{productParcel(cartItem.id)}}</p>
                    </div>
                </div>
            </div>
            <div class="table-total py-5">
                <div class="col-12">
                    <div class="row justify-content-end">
                        <div class="col-md-10 col-12 d-flex justify-content-md-end total-label">
                            <p>Total à vista</p>
                        </div>
                        <div class="col-md-2 col-12 d-flex total">
                            <p>{{this.formatPrice(this.$store.state.cart.cartData.total)}}</p>
                        </div>
                    </div>
                    <div class="row justify-content-end mt-4">
                        <div class="col-md-10 col-12 d-flex justify-content-md-end total-label">
                            <p>Total parcelado</p>
                        </div>
                        <div class="col-md-2 col-12 d-flex flex-column total-parcel">
                            <p><span class="parcel">Em até 10x </span>{{calculateTotalParcel()}}</p>
                            <p class="parcel">(Total {{ this.formatPrice(this.$store.state.cart.cartData.total) }})</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-cta py-5">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-md-6 col-12">
                            <button type="button" class="clear-cart" @click="clearCart()"><span><BootstrapIcon icon="trash-fill"/></span>Limpar Carrinho</button>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="row">
                                <div class="col-md-6 col-12 my-md-0 my-2">
                                    <a href="/" class="cart-back-btn">Continuar Comprando</a>
                                </div>
                                <div class="col-md-6 col-12">
                                    <a href="/checkout" class="checkout-btn">Concluir Compra</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container empty-cart text-center" v-else>
            <img src="@/assets/images/empty-cart.png">
            <h2>Você não possui itens no carrinho</h2>
            <div class="mt-5">
                <a href="/" class="back-btn">Voltar para loja</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            quantity: 1
        }
    },
    methods:{
        calculateProductTotal(id){
            let total = 0
            let price = 0
            let quantity = 1

            this.$store.state.cart.cartData.items.forEach(function(item){
                if(item.id == id){
                    price = item.price
                    quantity = item.quantity
                }
            })

            total = price * quantity

            return this.formatPrice(total)
        },
        calculateTotalParcel(){
            let parcel = this.$store.state.cart.cartData.total / 10
            return this.formatPrice(parcel)
        },
        productQuantity(operator , id){
            let quantity = 1
            if(operator == 'sum'){
                this.$store.state.cart.cartData.items.forEach(function(item){
                    if(item.id == id){
                        quantity = item.quantity + quantity
                    }
                })
                let productData = {
                    id: id,
                    quantity: quantity,
                }
                this.$store.commit('productQuantity' , productData)
                this.$store.commit('calculateCartTotal' , this.$store.state.cart.cartData.items)
            }else{
                this.$store.state.cart.cartData.items.forEach(function(item){
                    if(item.id == id){
                        quantity = item.quantity - quantity
                    }
                })
                if(quantity > 0){
                    let productData = {
                        id: id,
                        quantity: quantity,
                    }
                    this.$store.commit('productQuantity' , productData)
                    this.$store.commit('calculateCartTotal' , this.$store.state.cart.cartData.items)
                }
            }
        },
        formatPrice(price){
            const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
            const formatPrice = new Intl.NumberFormat('pt-BR', options)
        
            return formatPrice.format(price)
        },
        clearCart(){
           this.$store.commit('setClearCart') 
        },
        removeProduct(id){
            this.$store.commit('removeItem' , id)
            this.$store.commit('calculateCartTotal' , this.$store.state.cart.cartData.items)
        },
        productParcel(id){
            let price = 0
            let parcel = 0
            let quantity = 1
            this.$store.state.cart.cartData.items.forEach(function(item){
                if(item.id == id){
                    price = item.price
                    quantity = item.quantity
                }
            })

            parcel = price * quantity / 10

            return this.formatPrice(parcel)
        }
        
    },
    mounted(){
        this.$store.commit('calculateCartTotal' , this.$store.state.cart.cartData.items)
    }
}
</script>

<style lang="scss">
#carrinho{
    .table-cart{
        min-height: 100vh;
        .table-row{
            border-bottom: 1px solid #B7B7B7;
            .table-title{
                font-family: 'Source Sans Pro', sans-serif;
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 30px;
            }
        }
        .table-body{
            padding: 40px 0;
            .remove-product{
                background: transparent;
                border: none;
                svg{
                    color: #D0D0D0;
                    font-size: 24px;
                }
            }
            .cart-categories{
                font-family: 'Source Sans Pro', sans-serif;
                color: #8E36B7;
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .cart-product-title{
                font-family: 'Source Sans Pro', sans-serif;
                color: #434343;
                font-weight: 700;
                font-size: 16px;
                margin-bottom: 10px;
            }
            .quantity-btn{
                input {
                    width: 50px;
                    border-radius: 0;
                    border: 1px solid #999999;
                    text-align: center;
                }
                button{
                    width: 20px;
                    text-align: center;
                }
            }
            .cart-product-price{
                margin-bottom: 0;
                font-size: 18px;
                font-family: 'Source Sans Pro', sans-serif;
                color: #434343;
                font-weight: 700;
                span{
                    font-size: 16px;
                    font-weight: 400;
                }
                .parcel{
                    font-size: 16px;
                    font-weight: 400;
                }
            }
            #quantity-sum {
                background: transparent;
                border: 1px solid #999999;
                border-left: 0;
                border-radius: 0 5px 5px 0;
            }
            #quantity-sub {
                background: transparent;
                border: 1px solid #999999;
                border-right: 0;
                border-radius: 5px 0 0px 5px;
            }
        }
        .table-total{
            border-bottom: 1px solid #999999;
            .total-label{
                font-family: 'Source Sans Pro', sans-serif;
                font-size: 18px;
                font-weight: 700;
                color: #434343;
                text-transform: uppercase;
            }
            .total{
                font-family: 'Source Sans Pro', sans-serif;
                font-size: 18px;
                font-weight: 700;
                color: #8E36B7;
                text-transform: uppercase;
            }
            .total-parcel{
                p{
                    margin: 0;
                }
            }
        }
        .table-cta{
            .clear-cart{
                background: transparent;
                border: none;
                font-family: 'Source Sans Pro', sans-serif;
                color: #434343;
                font-size: 18px;
                transition: 0.5s;
                &:hover{
                    color: #8E36B7;
                }
            }
            span{
                svg{
                    color: #D0D0D0;
                    font-size: 24px;
                    margin-right: 10px;
                }
            }
            .cart-back-btn{
                background: #D0D0D0;
                width: 100%;
                padding: 15px;
                text-align: center;
                color: #fff;
                text-decoration: none;
                font-family: 'Source Sans Pro', sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                transition: 0.5s;
                display: block;
                border: 1px solid #D0D0D0;
                &:hover{
                    background: transparent;
                    color: #434343;
                    transition: 0.5s;
                }
            }
            .checkout-btn{
                background: #8E36B7;
                width: 100%;
                padding: 15px;
                text-align: center;
                color: #fff;
                text-decoration: none;
                font-family: 'Source Sans Pro', sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                transition: 0.5s;
                display: block;
                border: 1px solid #8E36B7;
                &:hover{
                    background: transparent;
                    color: #434343;
                    transition: 0.5s;
                }
            }
        }
    }
    .empty-cart{
        min-height: 100vh;
        margin-top: 65px;
        .back-btn{
            font-family: 'Source Sans Pro', sans-serif;
            padding: 10px 20px;
            border-radius: 5px;
            background: #8E36B7;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            transition: 0.5s;
            border: 1px solid #8E36B7;
            &:hover{
                transition: 0.5s;
                background: transparent;
                color: #444;
            }
        }
        img{
            width: 260px;
            margin-bottom: 30px;
        }
        p{
            margin-bottom: 30px;
        }
    }
    @media screen and (max-width:968px){
        .table-body{
            .quantity-btn{
                input{
                    width: 85% !important;
                }
            }
        } 
    }
}
</style>