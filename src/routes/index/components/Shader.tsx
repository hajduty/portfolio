import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;

float tanh(float x) {
    float e1 = exp(x);
    float e2 = exp(-x);
    return (e1 - e2) / (e1 + e2);
}

float segment(vec2 p, vec2 a, vec2 b) {
    p -= a;
    b -= a;
    return length(p - b * clamp(dot(p, b) / dot(b, b), 0.0, 1.0));
}

#define rot(a) mat2(cos(a + vec4(0.0, 1.57, -1.57, 0.0)))

float t;
vec2 T(vec3 p) {
    p.xy *= rot(-t);
    p.xz *= rot(0.785);
    p.yz *= rot(-0.625);
    return p.xy;
}

void mainImage(out vec4 O, vec2 u) {
    vec2 R = iResolution.xy, X, U = 10.0 * u / R.y, M = vec2(2.0, 2.3), I = floor(U / M) * M, J;
    U = mod(U, M);
    O *= 0.0;
    for (int k = 0; k < 4; k++) {
X = vec2(mod(float(k), 2.0), floor(float(k) / 2.0)) * M;
        J = I + X;
        // Workaround for modulus on vector:
        vec2 JM = floor(J / M);
        if (mod(JM.x + JM.y, 2.0) > 1.0) {
            X.y += 1.15;
        }
        t = tanh(-0.2 * (J.x + J.y) + mod(2.0 * iTime, 10.0) - 1.6) * 0.785;
        for (float a = 0.0; a < 6.0; a += 1.57) {
            vec3 A = vec3(cos(a), sin(a), 0.7);
            vec3 B = vec3(-A.y, A.x, 0.7);
            #define L(A,B) O += smoothstep(15.0 / R.y, 0.0, segment(U - X, T(A), T(B)))
            L(A, B);
            L(A, A * vec3(1.0, 1.0, -1.0));
            A.z = -A.z; B.z = -B.z;
            L(A, B);
        }
    }
}

void main() {
    vec4 color = vec4(0.0);
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}

`;

export default function Shader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    const cleanup = () => window.removeEventListener("resize", resize);

    // Compile shaders
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return cleanup();

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return cleanup();
    }

    gl.useProgram(program);

    // Fullscreen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResolutionLoc = gl.getUniformLocation(program, "iResolution");

    // Animation loop
    const start = performance.now();
    const draw = () => {
      const now = (performance.now() - start) / 1000;

      gl.useProgram(program); // Ensure program is active
      gl.uniform1f(iTimeLoc, now);
      gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
