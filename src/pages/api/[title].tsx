import type { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, GlobalFonts, Image } from '@napi-rs/canvas'
import path from 'path'
import { promises } from 'fs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query
  if (!title || typeof title !== 'string') {
    return res.status(400).end('Bad Request')
  }

  GlobalFonts.registerFromPath(
    path.resolve('./assets/ZenMaruGothic.woff2'),
    'ZenMaruGothic'
  )

  const imageBuffer = await promises.readFile(path.resolve('./assets/bg.png'))
  const image = new Image()
  image.src = imageBuffer

  const canvas = createCanvas(1200, 600)
  const ctx = canvas.getContext('2d')

  ctx.font = '64px ZenMaruGothic'
  ctx.drawImage(image, 0, 0, 1200, 600)
  ctx.fillText(title, 100, 150)
  return res.status(200).end(canvas.toBuffer('image/png'))
}

export default handler
