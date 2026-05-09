import { createRequire } from "module"
import fs from "fs"
import path from "path"

const require = createRequire("C:/Users/LOQ/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/x.js")
const { chromium } = require("playwright")

const videoPath = "C:\\Users\\LOQ\\Videos\\Screen Recordings\\Screen Recording 2026-05-01 143016.mp4"
const outDir = path.resolve("tmp-video-frames")

fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: "chrome", headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 })

const fileUrl = `file:///${videoPath.replace(/\\/g, "/").replace(/ /g, "%20")}`
await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 15000 })
await page.addStyleTag({
  content: "html, body { margin: 0; background: #111; } video { width: 100vw !important; height: 100vh !important; object-fit: contain !important; }",
})

const duration = await page.evaluate(async () => {
  const video = document.querySelector("video")
  let timer
  await new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error("metadata timeout")), 12000)
    video.addEventListener("loadedmetadata", resolve, { once: true })
    video.addEventListener("error", () => reject(new Error("video load error")), { once: true })
  }).finally(() => {
    clearTimeout(timer)
  })
  return video.duration
})

const fractions = [0.4, 0.44, 0.48, 0.52, 0.56, 0.6, 0.64, 0.68, 0.72]
const frames = []

for (let i = 0; i < fractions.length; i++) {
  const time = Math.max(0, Math.min(duration - 0.2, duration * fractions[i]))
  await page.evaluate(async (seekTime) => {
    const video = document.querySelector("video")
    await new Promise((resolve) => {
      video.addEventListener("seeked", resolve, { once: true })
      video.currentTime = seekTime
    })
  }, time)
  const output = path.join(outDir, `frame-${String(i + 1).padStart(2, "0")}.png`)
  await page.screenshot({ path: output, fullPage: false })
  frames.push({ time: Number(time.toFixed(2)), output })
}

await browser.close()
console.log(JSON.stringify({ duration: Number(duration.toFixed(2)), frames }, null, 2))
