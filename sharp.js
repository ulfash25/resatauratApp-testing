/* eslint-disable import/no-extraneous-dependencies */

const fs = require("fs")

const path = require("path")
const sharp = require("sharp")

const target = path.resolve(__dirname, "src/public/images/heros") //  <= sesuikan sama folder projectnya
const destination = path.resolve(__dirname, "src/public/images/heros") // <= sesuikan sama folder projectnya
fs.mkdirSync(destination, { recursive: true })
if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination)
}
fs.readdirSync(target).forEach((image) => {
    // mengubah ukuran gambar dengan lebar 900px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
        .resize(900)
        .toFile(
            path.resolve(
                __dirname,
                `${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`,
            ),
        )
    // mengubah ukuran gambar dengan lebar 400px, dengan prefix -small.jpg
    sharp(`${target}/${image}`)
        .resize(400)
        .toFile(
            path.resolve(
                __dirname,
                `${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`,
            ),
        )
    sharp(`${target}/${image}`)
        .resize(1800)
        .toFile(
            path.resolve(__dirname, `${destination}/${image.split(".").slice(0, -1).join(".")}-xl.jpg`),
        )
})
