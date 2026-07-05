import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImageIcon,
  description: 'Each entry is one image in the rotating homepage hero carousel.',
  fields: [
    defineField({
      name: 'image',
      title: 'Hero Banner Image',
      description: 'Click "Select" to browse your Cloudinary folders and pick a photo. No URL pasting needed.',
      type: 'cloudinary.asset',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Image Description (for screen readers)',
      description: 'A short description of what\'s in the photo, e.g. "Newborn baby wrapped in white cloth". Helps with accessibility and SEO.',
      type: 'string',
      validation: (rule) => rule.required().warning('Please add a description — it helps search engines find your site.'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls the sequence in the carousel. Lower numbers appear first. E.g. 1 shows before 2.',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'active',
      title: 'Show this image on the website',
      description: 'Toggle off to temporarily hide this image without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      order: 'order',
      active: 'active',
      media: 'image',
    },
    prepare({ title, order, active }) {
      return {
        title: title || 'Untitled slide',
        subtitle: `Order: ${order ?? '—'} · ${active === false ? '🔴 Hidden' : '🟢 Visible'}`,
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
