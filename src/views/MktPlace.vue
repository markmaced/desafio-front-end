<template>
    <div id="home" class="home">
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide>
                <div class="col-12 bg-home pt-5 pb-5">
                    <div class="container">
                        <div class="col-12 d-flex align-items-center justify-content-end pt-5 pb-5">
                            <div class="infos-content">
                                <h2 class="mb-0">Notebooks</h2>
                                <p class="m-0">As melhores ofertas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="col-12 bg-home pt-5 pb-5">
                    <div class="container">
                        <div class="col-12 d-flex align-items-center justify-content-end pt-5 pb-5">
                            <div class="infos-content">
                                <h2 class="mb-0">SmartTv</h2>
                                <p class="m-0">As melhores ofertas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="container my-5">
            <div class="search-content col-12 py-4 px-5">
                <div class="row">
                    <div class="col-md-3 col-12 d-flex align-items-center">
                        <p class="m-md-0">Encontre seu produto</p>
                    </div>
                    <div class="col-md-9 col-12 search-area">
                        <input type="text" class="search-input w-100" placeholder="Pesquisar..." v-model="searchQuery">
                        <span><BootstrapIcon icon="search"/></span>
                    </div>
                </div>
            </div>
        </div>
        <Products :list="resultQuery()"/>
    </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Products from '../components/Products.vue'
import axios from 'axios'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default({
    data (){
        return{
            productList: '',
            searchQuery: null
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        Products
    },
    setup() {
        const onSwiper = (swiper) => {
        };
        const onSlideChange = () => {
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
    methods:{
        resultQuery(){
            if(this.searchQuery){
                return this.productList.filter((item)=>{
                    return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
            }else{
                return this.productList;
            }
        }
    },
    async mounted(){
        await axios.get('https://raw.githubusercontent.com/owInteractive/desafio-frontend-2020/master/produtos.json').then((response) => {
            this.productList = response.data
        })
    }
})
</script>


<style lang="scss">
    #home{
        margin-bottom: 100px;
        .bg-home{
            background: linear-gradient(93.06deg, #8E36B7 0%, #D794F6 100%);
            .infos-content{
                text-align: right;
                h2{
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    font-size: 36px;
                    font-weight: 900;
                }
                p{
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 900;
                }
            }
        }
        .search-content{
            margin: 0 auto;
            box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.1);
            .search-area{
                position: relative;
                .search-input{
                    border: 1px solid #909090;
                    border-radius: 3px;
                    height: 45px;
                    padding: 0 20px;
                }
                svg{
                    font-size: 45px;
                    background: #8E36B7;
                    color: #fff;
                    padding: 10px 12px;
                    position: absolute;
                    right: 0;
                    border-radius: 0 3px 3px 0;
                }
            }
        }
        .swiper{
            height: 300px;
            .swiper-pagination{
                bottom: 0;
                .swiper-pagination-bullet{
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    border: 2px solid #A6A6A6;
                }
                .swiper-pagination-bullet-active{
                    border: 1px solid #8E36B7;
                    &::before{
                            content: " ●";
                            position: absolute;
                            top: -18px;
                            margin-left: -9px;
                            color: #8E36B7 !important;
                            font-size: 32px;
                    }
                }
            }
        }
    }
</style>