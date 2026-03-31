import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Plants } from "./collections/Plants";
import { Categories } from "./collections/Categories";
import { Tags } from "./collections/Tags";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Plants, Categories, Tags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [],
  endpoints: [
    {
      path: '/trefle/search',
      method: 'get',
      handler: async (req) => {
        const { searchParams } = new URL(req.url || '', 'http://localhost')
        const query = searchParams.get('q')

        if (!query) {
          return Response.json({ results: [] })
        }

        const res = await fetch(
          `https://trefle.io/api/v1/plants/search?q=${encodeURIComponent(query)}&token=${process.env.TREFLE_API_TOKEN}`
        )
        const data = await res.json()

        return Response.json({ results: data.data || [] })
      },
    },
    {
      path: '/trefle/species/:slug',
      method: 'get',
      handler: async (req) => {
        const slug = req.routeParams?.slug

        if (!slug) {
          return Response.json({ data: null })
        }

        const res = await fetch(
          `https://trefle.io/api/v1/species/${slug}?token=${process.env.TREFLE_API_TOKEN}`
        )
        const data = await res.json()

        return Response.json({ data: data.data || null })
      },
    },
  ],
});
