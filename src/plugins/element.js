import { ElButton,ElTable,ElTableColumn,ElDialog,ElDescriptions,ElDescriptionsItem,ElIcon,ElNotification,ElPopconfirm,ElDrawer,ElForm,ElFormItem, ElInput, ElLoading } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default (app) => {
  app.use(ElButton)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElDialog)
  .use(ElDescriptions)
  .use(ElDescriptionsItem)
  .use(ElIcon)
  .use(ElNotification)
  .use(ElPopconfirm)
  .use(ElDrawer)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElInput)
  .use(ElLoading)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

