import {} from 'bootstrap-vue';
import Vue from 'vue';
import Router from 'vue-router';
import AddEmployee from './components/AddEmployee';


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/addemployee',
            component: AddEmployee
        },

    ]
});


router.beforeEach((to, from, next) => {
    console.log()

    if (to.meta.requiresAuth) {
        const authUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('token')
        const authRole = localStorage.getItem('role');

        if (!authUser || !authToken) {
            next('/login')
        } else if (to.meta.adminAuth) {
            authRole.replace(/['"]+/g, '') === 'admin'
        }
        // else if (to.meta.ab) {
        //     authRole.replace(/['"]+/g, '') === 'BR-M' || authRole.replace(/['"]+/g, '') === 'admin' ? next() : next('/user')
        // }
        else if (to.meta.branchmanagerAuth) {
            authRole.replace(/['"]+/g, '') === 'BR-M' ? next() : next('/user')
        }
    } else {
        next();
    }
});