export function stopWatch () {
  let initial = 0
  let final = 0
  let interval = 0
  const divisors = {
    seconds: 1000,
    minutes: 60 * 1000
  }

  const start = () => {
    initial = new Date().getTime()
    return initial
  }

  const computeInterval = (unit) => {
    interval = final - initial

    if (unit === undefined) {
      return interval
    }

    if (!divisors[unit]) {
      throw new TypeError('Invalid unit')
    }

    return interval / divisors[unit]
  }

  const stop = () => {
    final = new Date().getTime()
    return computeInterval()
  }

  return {
    interval,
    computeInterval,
    start,
    stop
  }
}

export async function base64ToImage (base64, width, height) {
  const image = new Image()
  image.src = base64

  if (width) {
    image.width = width
  }

  if (height) {
    image.heigh = height
  }

  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', err => reject(err))
  })
}
