import type { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, loadImage, registerFont } from 'canvas'
import path from 'path'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query
  if (!title || typeof title !== 'string') {
    return res.status(400).end('Bad Request')
  }
  registerFont(path.resolve('./public/ZenMaruGothic.ttf'), {
    family: 'ZenMaruGothic',
  })
  const canvas = createCanvas(1200, 600)
  const ctx = canvas.getContext('2d')
  ctx.font = '64px "ZenMaruGothic"'

  loadImage(path.resolve('./public/bg.png')).then((image) => {
    ctx.drawImage(image, 0, 0, 1200, 600)
    ctx.fillText(title, 100, 150)
    res.status(200).end(canvas.toBuffer())
  })
}

export default handler
