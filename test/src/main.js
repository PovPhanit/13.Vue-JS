import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import FoodItems from './FoodItem.vue'
import AnimalCollection from './AnimalCollection.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/animals' }, // Redirect root URL to '/animals'
        { path: '/animals', component: AnimalCollection },
        { path: '/food', component: FoodItems },
    ]
});

const app = createApp(App)

app.use(router)

app.mount('#app')
// import { createApp } from 'vue'
// import { createRouter, createWebHistory } from 'vue-router'

// import App from './App.vue'
// import FoodItems from './FoodItem.vue'
// import AnimalCollection from './AnimalCollection.vue'
// import Pizza from './Pizza.vue'
// import Noodle from './Noodle.vue'
// import Salad from './Salad.vue'

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/animals', component: AnimalCollection },
//         { 
//             path: '/food', 
//             component: FoodItems,
//             redirect: '/food/pizza', // Redirect from /food to /food/pizza
//             children: [
//                 { path: 'pizza', component: Pizza },
//                 { path: 'noodle', component: Noodle },
//                 { path: 'salad', component: Salad }
//             ]
//         }
//     ]
// });

// const app = createApp(App)

// app.use(router);

// app.mount('#app')
