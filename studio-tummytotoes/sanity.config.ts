import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'TummyToToes',

  projectId: 'syk805tl',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), cloudinarySchemaPlugin()],

  schema: {
    types: schemaTypes,
  },
})
