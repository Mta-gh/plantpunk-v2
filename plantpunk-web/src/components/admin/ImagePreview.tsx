'use client'

import { useFormFields } from '@payloadcms/ui'

export const ImagePreview = () => {
  const imageUrl = useFormFields(([fields]) => fields.image_url?.value as string)

  if (!imageUrl) return null

  return (
    <div style={{ marginBottom: '1rem' }}>
      <img
        src={imageUrl}
        alt="Plant preview"
        style={{
          width: 333,
          height: 333,
          objectFit: 'cover',
          borderRadius: '8px',
          border: '1px solid var(--theme-elevation-150)',
        }}
      />
    </div>
  )
}