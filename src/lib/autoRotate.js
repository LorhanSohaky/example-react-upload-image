import jo from 'jpeg-autorotate'

import { base64ToImage, base64MimeType } from '../utils'

export default async function autoRotate (image) {
  const type = base64MimeType(image.src)

  if (type !== 'image/jpeg') {
    return image
  }

  const fileBuffer = Buffer.from(image.src.replace(/^data:.+;base64,/, ''), 'base64')

  return jo.rotate(fileBuffer, {}).then(({ buffer, dimensions }) => {
    const encoded = 'data:image/jpeg;base64,' + buffer.toString('base64')

    return base64ToImage(encoded, dimensions.width, dimensions.height)
  }).catch(() => image)
}
