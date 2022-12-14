import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises } from 'fs'
import { createCanvas, GlobalFonts, Image } from '@napi-rs/canvas'
import { CanvasTextWrapper } from 'canvas-text-wrapper'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query
  if (!title || typeof title !== 'string') {
    return res.status(400).end('Bad Request')
  }

  if (!GlobalFonts.has('ZenMaruGothic')) {
    GlobalFonts.registerFromPath(
      path.resolve('./assets/ZenMaruGothic.woff2'),
      'ZenMaruGothic'
    )
  }

  const imageBuffer = await promises.readFile(path.resolve('./assets/bg.png'))
  const image = new Image()
  image.src = imageBuffer

  const canvas = createCanvas(1200, 600)
  const ctx = canvas.getContext('2d')

  ctx.font = '64px ZenMaruGothic'
  ctx.drawImage(image, 0, 0, 1200, 600)
  CanvasTextWrapper(canvas as any, title, {
    font: '64px ZenMaruGothic',
    lineBreak: 'all',
    paddingX: 100,
    paddingY: 10,
    lineHeight: 1.5,
  })

  res.setHeader('Content-Type', 'image/png')
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  )
  return res.status(200).end(canvas.toBuffer('image/png'))
}

export default handler
