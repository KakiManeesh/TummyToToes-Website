import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const CATEGORIES = [
  { title: 'Newborn', value: 'Newborn' },
  { title: 'Maternity', value: 'Maternity' },
  { title: 'Kids', value: 'Kids' },
  { title: 'Fashion', value: 'Fashion' },
  { title: 'Events', value: 'Events' },
  { title: 'Weddings', value: 'Weddings' },
]

export const galleryPanel = defineType({
  name: 'galleryPanel',
  title: 'Gallery Panel',
  type: 'document',
  icon: ImagesIcon,
  description: 'One of the 5 panels in the homepage portfolio showcase section.',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      description: 'The bold heading shown on the panel, e.g. "Newborn Stories" or "Maternity Glow".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Photo',
      description: 'Click "Select" to browse your Cloudinary folders and pick the main photo for this panel.',
      type: 'cloudinary.asset',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Caption',
      description: 'One or two sentences describing this photography style. Shown below the title.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(200).warning('Keep it under 200 characters'),
    }),
    defineField({
      name: 'category',
      title: 'Photography Category',
      description: 'Choose the category this panel links to in the full gallery page.',
      type: 'string',
      options: {
        list: CATEGORIES,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'objectPosition',
      title: 'Image Focus Point',
      description: 'If the photo is being cropped awkwardly, adjust the focus. "center" works for most photos.',
      type: 'string',
      options: {
        list: [
          { title: 'Center (default)', value: 'center center' },
          { title: 'Top', value: 'center 20%' },
          { title: 'Bottom', value: 'center 80%' },
          { title: 'Left', value: '20% center' },
          { title: 'Right', value: '80% center' },
        ],
        layout: 'radio',
      },
      initialValue: 'center center',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the top-to-bottom order of panels. Lower numbers appear first.',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order',
    },
    prepare({ title, category, order }) {
      return {
        title: title || 'Untitled panel',
        subtitle: `${category ?? '—'} · Order: ${order ?? '—'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
