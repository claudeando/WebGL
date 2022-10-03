

const c = document.getElementById('WebGl')
c.width = window.innerWidth
c.height = window.innerHeight

const webgl = c.getContext('webgl') || c.getContext('experimental-webgl')

webgl = clearColor(0.0, 0.00, 0.0, 1.0)
webgl = clearDepth(1.0)
webgl = clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)