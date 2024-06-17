import { createApp } from 'vue'

import App from './App.vue'
import FoodItem from './FoodItem.vue'

const app = createApp(App)

app.component('food-item', FoodItem)

app.mount('#app')
                  