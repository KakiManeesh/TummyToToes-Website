import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const photographyPackage = defineType({
  name: 'package',
  title: 'Package',
  type: 'document',
  icon: TagIcon,
  description: 'A photography package shown on the Packages section of the homepage.',
  fieldsets: [
    {
      name: 'pricing',
      title: 'Pricing',
      options: { collapsible: false },
    },
    {
      name: 'details',
      title: 'What\'s Included',
      options: { collapsible: false },
    },
    {
      name: 'display',
      title: 'Display Settings',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Package Name',
      description: 'The name shown as the card heading, e.g. "Newborn Session Package".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Starting Price in ₹',
      description: 'Enter the number only — no ₹ symbol needed. E.g. type 12000 for ₹12,000.',
      type: 'number',
      fieldset: 'pricing',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'features',
      title: 'What\'s Included',
      description: 'Add one item per line. Each item appears as a bullet point on the package card.',
      type: 'array',
      fieldset: 'details',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      validation: (rule) => rule.min(1).error('Add at least one feature'),
    }),
    defineField({
      name: 'bonusFeatures',
      title: 'Bonus Items (optional)',
      description: 'Extra perks that appear under a "Bonus" label. Leave empty if none.',
      type: 'array',
      fieldset: 'details',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Mark as Featured (highlighted card)',
      description: 'Turn on to make this card stand out with a coloured top border and slightly larger size.',
      type: 'boolean',
      fieldset: 'display',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls left-to-right position. Lower numbers appear first. E.g. 1 is the leftmost card.',
      type: 'number',
      fieldset: 'display',
      initialValue: 10,
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      featured: 'featured',
    },
    prepare({ title, price, featured }) {
      return {
        title: title || 'Untitled package',
        subtitle: `₹${price?.toLocaleString('en-IN') ?? '—'}${featured ? ' ⭐ Featured' : ''}`,
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
