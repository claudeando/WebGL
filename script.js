const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clearDepth(1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

console.log('hello');



const v_shader = create_shader('vs');
const f_shader = create_shader('fs');

const prg = create_program(v_shader, f_shader);

const attLocation = new Array(2);
attLocation[0] = gl.getAttribLocation(prg, 'position');
attLocation[1] = gl.getAttribLocation(prg, 'color');

const attStride = new Array(2);
attStride[0] = 3;
attStride[1] = 4;



const create_shader = (id) => {
    let shader;

    const scriptElement = document.getElementById('id');

    if (!scriptElement) {
        return alert('WebGL is not available.');
    }

    switch (scriptElement.type) {

        case 'x-shader/x-vertex':
            shader = gl.createShader(gl.VERTEX_SHADER);
            break;

        case 'x-shader/x-fragment':
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            break;

        default:
            returnl;
    }

    gl.shaderSource(shader, scriptElement.text);

    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    } else {
        return alert(gl.getShaderInfoLog(shader));
    }
}


const create_program = (vs, fs) => {
    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);
        return program;
    } else {
        alert(gl.getProgramInfoLog(program));
    }
}


const create_vbo = (data) => {
    const vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;

}