## Purpose

## Installation
```bash
pnpm i vue-router-redirect-by-link
# or
npm i vue-router-redirect-by-link
```

### Setup
```js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueRouterRedirectByLink from 'vue-router-redirect-by-link'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
})
app.use(router).use(VueRouterRedirectByLink)
```
## Usage
```js
// later add.
```
## Config