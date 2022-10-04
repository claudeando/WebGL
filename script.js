// Canvas要素の取得
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// WebGl Contextの取得　（これは何なのか）
const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

// WebGl Canvasの初期化
webgl = clearColor(255, 0.0, 0.0, 1.0)
webgl = clearDepth(1.0)
webgl = clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

// Shader: 書く順番は決まっていて、Vertex Shader -> Fragment Shader になります。
// Shader (GLSL) should be written in HTML