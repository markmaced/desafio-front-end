<template>
    <header>
        <div class="container-md col-12 py-4">
            <div class="row">
                <div class="col-6">
                    <a href="/">
                        <img src="@/assets/images/logo-MktPlace.png">
                    </a>
                </div>
                <div class="col-6 d-flex justify-content-end align-items-center gap-3">
                    <p class="m-0">Produtos</p>
                    <div class="cart-icon">
                        <a href="/carrinho">
                            <span><BootstrapIcon icon="cart-fill"/></span>
                            <span class="cart-flag">{{this.$store.state.cart.cartData.items.length}}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

export default({
    name: 'Header',
})
</script>

<style>
header{
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.1);
}
.cart-label{
    margin-right: 20px;
}
.cart-icon span svg {
    font-size: 30px;
    color: #8E36B7;
}
.cart-icon{
    position: relative;
}
.cart-flag {
    font-family: 'Source Sans Pro', sans-serif;
    background: #ED1C24;
    padding: 0 5px;
    font-size: 10px;
    border-radius: 50px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 25px;
}
</style>