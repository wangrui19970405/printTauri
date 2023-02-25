import * as ElIcons from '@element-plus/icons-vue'
import { createApp } from "vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from "./App.vue"

const app = createApp(App)
for (const iconName in ElIcons) {    app.component(iconName,ElIcons[iconName])}
app.use(ElementPlus).mount("#app")
export default app