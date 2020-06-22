import React from "react"
import styles from "./wave.module.css"

class Wave extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }

  filterData(audioBuffer) {
    const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
    const samples = 600 // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
    const filteredData = []
    for (let i = 0; i < samples && (i + 1) * blockSize < rawData.length; i++) {
      let blockStart = blockSize * i
      let sum = rawData
        .slice(blockStart, blockStart + blockSize)
        .reduce((a, b) => Math.abs(a) + Math.abs(b), 0)
      filteredData.push(sum / blockSize)
    }
    return filteredData
  }

  normalizeData(filteredData) {
    const multiplier = Math.pow(Math.max(...filteredData), -1)
    return filteredData.map(n => n * multiplier)
  }

  drawLineSegment(ctx, x, y, width, isEven) {
    ctx.lineWidth = 1 // how thick the line is
    ctx.strokeStyle = "#fff" // what color our line is
    ctx.beginPath()
    y = isEven ? y : -y
    ctx.moveTo(x, 0)
    ctx.lineTo(x, y)
    ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven)
    ctx.lineTo(x + width, 0)
    ctx.stroke()
  }

  draw(normalizedData) {
    // Set up the canvas
    const canvas = document.querySelector("canvas")
    const dpr = window.devicePixelRatio || 1
    const padding = 20
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr
    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)
    ctx.translate(0, canvas.height / 2)

    // draw the line segments
    const width = canvas.offsetWidth / normalizedData.length
    for (let i = 0; i < normalizedData.length; i++) {
      const x = width * i
      let height = normalizedData[i] * canvas.offsetHeight - 2 * padding
      height = Math.max(0, height)
      height = Math.min(canvas.offsetHeight / 2 - padding, height)
      this.drawLineSegment(ctx, x, height, width, (i + 1) % 2)
    }
  }

  updateCanvas() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContext()
    const url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3"

    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => this.draw(this.normalizeData(this.filterData(audioBuffer))))

  }

  render() {
    return (
      <div className={styles.waveContainer}>
        <canvas ref="canvas" className={styles.canv}>Canv</canvas>
      </div>
    )
  }
}

export default Wave