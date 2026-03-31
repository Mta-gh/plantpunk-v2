'use client'

import { useCallback, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

interface TrefleResult {
  id: number
  common_name: string | null
  scientific_name: string
  slug: string
  family: string
  genus: string
  image_url: string | null
}

export const TrefleSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TrefleResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const dispatchFields = useFormFields(([_, dispatch]) => dispatch)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/trefle/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
      setOpen(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const selectPlant = useCallback(async (plant: TrefleResult) => {
    const fields: Record<string, string | number | null> = {
      trefle_id: plant.id,
      common_name: plant.common_name || '',
      scientific_name: plant.scientific_name,
      slug: plant.slug,
      family: plant.family,
      genus: plant.genus,
      image_url: plant.image_url,
    }

    for (const [path, value] of Object.entries(fields)) {
      dispatchFields({
        type: 'UPDATE',
        path,
        value,
      })
    }

    try {
      const res = await fetch(`/api/trefle/species/${plant.slug}`)
      const data = await res.json()
      const species = data.data

      if (species) {
        const growthFields: Record<string, number | string | null> = {}

        if (species.growth) {
          if (species.growth.light != null) growthFields['growth.light'] = species.growth.light
          if (species.growth.atmospheric_humidity != null) growthFields['growth.atmospheric_humidity'] = species.growth.atmospheric_humidity
          if (species.growth.soil_humidity != null) growthFields['growth.soil_humidity'] = species.growth.soil_humidity
          if (species.growth.minimum_temperature?.deg_c != null) growthFields['growth.minimum_temperature.deg_c'] = species.growth.minimum_temperature.deg_c
          if (species.growth.maximum_temperature?.deg_c != null) growthFields['growth.maximum_temperature.deg_c'] = species.growth.maximum_temperature.deg_c
        }

        if (species.specifications) {
          if (species.specifications.toxicity) growthFields['specifications.toxicity'] = species.specifications.toxicity
          if (species.specifications.growth_rate) growthFields['specifications.growth_rate'] = species.specifications.growth_rate
          if (species.specifications.maximum_height?.cm != null) growthFields['specifications.maximum_height.cm'] = species.specifications.maximum_height.cm
        }

        for (const [path, value] of Object.entries(growthFields)) {
          dispatchFields({
            type: 'UPDATE',
            path,
            value,
          })
        }
      }
    } catch {
    }

    setOpen(false)
    setQuery('')
  }, [dispatchFields])

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
        Search Trefle
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          placeholder="Search for a plant on Trefle..."
          onChange={(e) => {
            setQuery(e.target.value)
            search(e.target.value)
          }}
          onFocus={() => results.length > 0 && setOpen(true)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            background: 'var(--theme-input-bg)',
            color: 'var(--theme-text)',
            fontSize: '1rem',
          }}
        />
        {loading && (
          <span style={{ position: 'absolute', right: '0.75rem', top: '0.75rem', opacity: 0.5 }}>
            Searching...
          </span>
        )}
        {open && results.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 100,
              background: 'var(--theme-bg)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              maxHeight: '300px',
              overflowY: 'auto',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {results.map((plant) => (
              <li
                key={plant.id}
                onClick={() => selectPlant(plant)}
                style={{
                  padding: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: '1px solid var(--theme-elevation-100)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--theme-elevation-50)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {plant.image_url && (
                  <img
                    src={plant.image_url}
                    alt=""
                    style={{ width: 99, height: 99, objectFit: 'cover', borderRadius: '4px' }}
                  />
                )}
                <div>
                  <strong>{plant.common_name || plant.scientific_name}</strong>
                  {plant.common_name && (
                    <span style={{ opacity: 0.6, marginLeft: '0.5rem', fontStyle: 'italic' }}>
                      {plant.scientific_name}
                    </span>
                  )}
                  <br />
                  <small style={{ opacity: 0.5 }}>{plant.family}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}