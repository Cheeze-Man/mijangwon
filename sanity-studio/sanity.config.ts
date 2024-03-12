// import {defineConfig, isDev} from 'sanity'
// import {visionTool} from '@sanity/vision'
// import {structureTool} from 'sanity/structure'
// import {schemaTypes} from './schemaTypes'
// import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'mijangwon',

  projectId: 'zj3h39si',
  dataset: 'production',

  // plugins: [structureTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],
  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})
