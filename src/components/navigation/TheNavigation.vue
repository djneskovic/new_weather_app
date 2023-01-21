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

                <div class="nav-content" :class="{ 'nav-content--active': toggleMenu }">
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
    /* position: relative; */
    overflow: hidden;
}

.navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}

.logo {
    width: 100px;
    height: 100px;
}

.hamburger {
    font-size: 2rem;
    color: white;
    display: none;
}

.nav-content {
    position: static;
}

.nav-content .nav-list {
    display: flex;
}

.nav-content .nav-list li {
    padding: 0 1rem;
}

.nav-content .nav-list li a {
    color: white;
}

@media screen and (max-width: 800px) {
    .logo {
        width: 85px;
        height: 85px;
    }

    .hamburger {
        display: block;
    }

    .nav-content {
        position: absolute;
        width: 100%;
        right: -100%;
        top: 0;
        text-align: center;
        margin-top: 5.3rem;
        transition: all .4s ease;
        overflow: hidden;
    }

    .nav-content--active {
        right: 0;
    }

    .nav-content .nav-list {
        display: flex;
        flex-direction: column;
    }

    .nav-content .nav-list li {
        padding: 1rem 0;
        background-color: #302f4e;
    }
}
</style>

