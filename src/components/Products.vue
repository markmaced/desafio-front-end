<template>
    <div class="products container">
        <div class="col-12 mx-auto">
            <div class="row" v-if="list.length > 0">
                <div class="product-area col-md-4 col-12" v-for="(product) in list" v-bind:key="product.id">
                    <div class="product-card col-12">
                        <div class="product-header">
                            <img :src="product.imageUrl">
                        </div>
                        <div class="product-infos">
                            <div class="product-content px-4">
                                <p class="categories">{{product.category}}</p>
                                <p class="product-title">{{product.name}}</p>
                                <p class="product-description">{{product.description}}</p>
                                <p class="product-price">{{formatPrice(product.price)}}</p>
                            </div>
                            <div class="add-to-cart-content d-flex justify-content-center">
                                <button type="button" @click="addToCart(product.id)" class="add-to-cart-btn">Adicionar ao carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="empty-list" v-else>
                <h2>Nenhum produto encontrado</h2>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default{
    name:'products',
    props: ['list'],
    data () {
        return{
            products: '',
            cart: null,
        }
    },
    methods: {
        addToCart(id){
            let productData = {}

            this.list.forEach(function(item){
                if(item.id == id){
                    productData = {
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        price: item.price,
                        quantity: 1,
                    }
                }
            })
            
            this.$store.commit('setCartItem', productData)
            this.$router.push('/carrinho');
        },
        formatPrice(price){
            const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
            const formatPrice = new Intl.NumberFormat('pt-BR', options)
        
            return formatPrice.format(price)
        },
    },
    mounted(){
    }
}
</script>


<style lang="scss">
.products{
    .product-area{
        margin-bottom: 60px;   
        .product-card{
            box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
        }
        .add-to-cart-btn{
            font-family: 'Source Sans Pro', sans-serif;
            background: transparent;
            color: #8E36B7;
            font-size: 14px;
            font-weight: 700;
            border: none;
            border-top: 1px solid #aaa;
            width: 100%;
            padding: 15px 0;
            text-transform: uppercase;
            transition: 0.5s;
            &:hover{
                transition: 0.5s;
                background: #8E36B7;
                color: #fff;
            }
        }
        .categories{
            font-family: 'Source Sans Pro', sans-serif;
            color: #8E36B7;
            font-weight: 700;
            font-size: 14px;
            margin-top: 30px;
            margin-bottom: 10px;
        }
        .product-title{
            font-family: 'Source Sans Pro', sans-serif;
            color: #434343;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .product-description{
            font-family: 'Source Sans Pro', sans-serif;
            color: #434343;
            font-weight: 400;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-height: 16px;    
            max-height: 32px;     
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .product-price{
            font-family: 'Source Sans Pro', sans-serif;
            color: #434343;
            font-weight: 700;
            font-size: 25px;
            margin-bottom: 25px;
        }
        .product-header{
            img{
                max-width: 100%;
                width: 100%;
                height: 250px;
                object-fit: contain;
                object-position: center;
            }
        }
    }
    .empty-list{
        min-height: 50vh;
    }
}
</style>