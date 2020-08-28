import Pica from 'pica'
import readFile from './readFile'

const resizerMode = {
  js: true,
  wasm: true,
  cib: true,
  ww: true
}

const opts = []

Object.keys(resizerMode).forEach(function (k) {
  if (resizerMode[k]) opts.push(k)
})

const pica = Pica({
  features: opts
})

function resolveDimensions (dimensions) {
  const aspectRatio = dimensions.width / dimensions.height

  if (aspectRatio > 1) {
    const width = Math.min(dimensions.width, 1080)
    const height = width / aspectRatio
    return { width, height }
  } else {
    const height = Math.min(dimensions.height, 1080)
    const width = height * aspectRatio
    return { width, height }
  }
}

export default async function compressImageAndAutoResize (image) {
  const { width, height } = image

  const newDimensions = resolveDimensions({ width, height })

  const canvas = document.createElement('canvas')
  canvas.width = newDimensions.width
  canvas.height = newDimensions.height

  await pica.resize(image, canvas)

  return canvasToJpegBase64(canvas)
}

async function canvasToJpegBase64 (canvas) {
  const blob = await pica.toBlob(canvas, 'image/jpeg')

  return readFile(blob)
}
