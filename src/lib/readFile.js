export default async function readFile (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => resolve(event.target.result)
    fileReader.onabort = (event) => reject(event)
    fileReader.onerror = (event) => reject(event)
    fileReader.readAsDataURL(file)
  })
}
