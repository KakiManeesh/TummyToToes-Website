import { createElement } from 'react'
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const CATEGORIES = [
  { title: 'Newborn', value: 'Newborn' },
  { title: 'Maternity', value: 'Maternity' },
  { title: 'Kids', value: 'Kids' },
  { title: 'Events', value: 'Events' },
  { title: 'Fashion', value: 'Fashion' },
  { title: 'Wedding', value: 'Wedding' },
]

export const galleryCategory = defineType({
  name: 'galleryCategory',
  title: 'Gallery Category',
  type: 'document',
  icon: ImagesIcon,
  description: 'Manage the collection of images displayed in each gallery tab on the website.',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      description: 'The display name for this category, e.g. "Newborn Stories" or "Little Wonders".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Slug',
      description: 'The internal identifier. Must match one of the website gallery tabs.',
      type: 'string',
      options: {
        list: CATEGORIES,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description: 'Drag and drop to reorder, add new images from Cloudinary, or delete existing ones.',
      type: 'array',
      of: [
        {
          type: 'cloudinary.asset',
          preview: {
            select: {
              imageUrl: 'secure_url',
              title: 'public_id',
              resourceType: 'resource_type',
            },
            prepare(selection) {
              const { title, imageUrl, resourceType } = selection
              return {
                title: title ? title.split('/').pop() : 'Cloudinary Image',
                subtitle: resourceType ? `Cloudinary ${resourceType}` : 'Cloudinary image',
                media: imageUrl
                  ? createElement('img', {
                      src: imageUrl,
                      alt: title ? title.split('/').pop() : 'Cloudinary Image',
                      style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      },
                    })
                  : undefined,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).error('Please add at least one image to this category.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      images: 'images',
    },
    prepare({ title, category, images }) {
      const count = images?.length || 0
      return {
        title: title || 'Untitled Category',
        subtitle: `${category || '—'} · ${count} image${count === 1 ? '' : 's'}`,
      }
    },
  },
})
