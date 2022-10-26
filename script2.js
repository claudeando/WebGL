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



const vertex_position = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
];

const vertex_color = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
];

const position_vbo = create_vbo(vertex_position);
const color_vbo = create_vbo(vertex_color);

gl.bindBuffer(gl.ARRAY_BUFFER, position_vbo);
gl.enableVertexAttribArray(attLocation[0]);
gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, color_vbo);
gl.enableVertexAttribArray(attLocation[0]);
gl.vertexAttribPointer(attLocation[1], attStride[1], gl.FLOAT, false, 0, 0);





// minMatrix.js を用いた行列関連処理
// matIVオブジェクトを生成
var m = new matIV();

// 各種行列の生成と初期化
var mMatrix = m.identity(m.create());
var vMatrix = m.identity(m.create());
var pMatrix = m.identity(m.create());
var mvpMatrix = m.identity(m.create());

// ビュー座標変換行列
m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);

// プロジェクション座標変換行列
m.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);

// 各行列を掛け合わせ座標変換行列を完成させる
m.multiply(pMatrix, vMatrix, mvpMatrix);
m.multiply(mvpMatrix, mMatrix, mvpMatrix);

// uniformLocationの取得
var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

// uniformLocationへ座標変換行列を登録
gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);




gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.flush();



function create_shader(id) {
    let shader;

    const scriptElement = document.getElementById(id);

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


function create_program(vs, fs) {
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


function create_vbo(data) {
    const vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
}