import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPlants() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'plants',
    limit: 100,
  })
  return result.docs
}

export async function getPlant(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'plants',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getCategories() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  return result.docs
}

export async function getTags() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'tags',
    limit: 100,
  })
  return result.docs
}
