import type { CollectionConfig } from 'payload'

export const Plants: CollectionConfig = {
  slug: 'plants',
  admin: {
    useAsTitle: 'common_name',
  },
  fields: [
    {
      name: 'trefle_search',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/TrefleSearch#TrefleSearch',
        },
        disableListColumn: true,
      },
    },
    {
      name: 'trefle_id',
      type: 'number',
      label: 'Trefle ID',
      admin: { position: 'sidebar' },
    },
    {
      name: 'common_name',
      type: 'text',
      label: 'Common Name',
      required: true,
    },
    {
      name: 'scientific_name',
      type: 'text',
      label: 'Scientific Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'family',
      type: 'text',
      label: 'Family',
    },
    {
      name: 'genus',
      type: 'text',
      label: 'Genus',
    },
    {
      name: 'image_url',
      type: 'text',
      label: 'Trefle Image URL',
      admin: { position: 'sidebar' },
    },
    {
      name: 'image_preview',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/ImagePreview#ImagePreview',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'is_cover',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },

    {
      name: 'growth',
      type: 'group',
      fields: [
        {
          name: 'light',
          type: 'number',
          label: 'Light (0-10)',
          min: 0,
          max: 10,
        },
        {
          name: 'atmospheric_humidity',
          type: 'number',
          label: 'Atmospheric Humidity (0-10)',
          min: 0,
          max: 10,
        },
        {
          name: 'soil_humidity',
          type: 'number',
          label: 'Soil Humidity (0-10)',
          min: 0,
          max: 10,
        },
        {
          name: 'minimum_temperature',
          type: 'group',
          fields: [
            {
              name: 'deg_c',
              type: 'number',
              label: 'Min Temperature (°C)',
            },
          ],
        },
        {
          name: 'maximum_temperature',
          type: 'group',
          fields: [
            {
              name: 'deg_c',
              type: 'number',
              label: 'Max Temperature (°C)',
            },
          ],
        },
      ],
    },

    {
      name: 'specifications',
      type: 'group',
      fields: [
        {
          name: 'toxicity',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ],
        },
        {
          name: 'growth_rate',
          type: 'text',
          label: 'Growth Rate',
        },
        {
          name: 'maximum_height',
          type: 'group',
          fields: [
            {
              name: 'cm',
              type: 'number',
              label: 'Max Height (cm)',
            },
          ],
        },
      ],
    },

    {
      name: 'care',
      type: 'group',
      label: 'PlantPunk Care Info',
      fields: [
        {
          name: 'watering',
          type: 'select',
          options: [
            { label: 'Rarely', value: 'rarely' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Twice Weekly', value: 'twice_weekly' },
            { label: 'Frequent', value: 'frequent' },
          ],
        },
        {
          name: 'watering_info',
          type: 'textarea',
          label: 'Watering Info',
        },
        {
          name: 'difficulty',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
        {
          name: 'substrate',
          type: 'textarea',
        },
        {
          name: 'tips',
          type: 'richText',
        },
      ],
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
