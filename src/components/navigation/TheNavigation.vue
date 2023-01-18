<template>

    <nav id="navigation">

        <div class="container">

            <div class="navigation">

                <div class="logo">
                    <img src="../../assets/logo.png" alt="">
                </div>

                <div class="hamburger" @click="onClickToggle">
                    <i class="fas fa-bars"></i>
                </div>

                <div class="nav-content" :class="{ block: toggleMenu }">
                    <ul class="nav-list">
                        <li class="nav-item" @click="close"><router-link to="/forecast">Forecast</router-link></li>
                        <li class="nav-item" @click="close"><router-link to="/favorites">Favorite</router-link>
                        </li>
                        <li class="nav-item" @click="close"><router-link to="/about">About Me</router-link></li>
                    </ul>
                </div>


            </div>

        </div>

    </nav>
</template>

<script>
export default {
    data() {
        return {
            toggleMenu: false,

        }
    },
    methods: {
        onClickToggle() {
            this.toggleMenu = !this.toggleMenu;
        },
        close() {
            this.toggleMenu = false;
        }
    },

}
</script>

<style scoped>
#navigation {
    background-color: #302f4e;
    position: relative;
}

.logo {
    width: 70px;
    height: 70px;
}

.navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}

.nav-content {
    position: absolute;
    inset: 0;
    text-align: center;
    margin-top: 4rem;
    display: none;
}

/* 
.open {
    animation: slide-to-left 1s ease;
}


@keyframes slide-to-left {
    0% {
        transform: translateX(500px);
    }

    100% {
        transform: translateX(0);
    }
} */

.block {
    display: block;
}

.nav-item {
    padding: .5rem 0;
    background-color: #302f4e;
    /* height: 100%; */
}

.nav-item:hover {
    background-color: #545384;
}

a {
    color: #fff;
}

.hamburger {
    cursor: pointer;
    color: #fff;
    font-size: 1.6rem;
}

@media screen and (min-width: 800px) {

    .logo {
        width: 100px;
        height: 100px;
    }

    .hamburger {
        display: none;
    }

    .nav-content {
        position: relative;
        margin: 0;
        display: flex;
    }

    .nav-list {
        display: flex;
        margin-top: 0;
    }

    .nav-item {
        padding: 2.3rem .7rem;
    }

    .nav-item:hover {
        background-color: #545384;
    }
}
</style>

