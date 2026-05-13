import { Renderer, Program, Mesh, Triangle, type OGLRenderingContext } from 'ogl';

interface ShaderBgOptions {
  canvas: HTMLCanvasElement;
  colors?: [string, string, string];
  speed?: number;
}

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export class ShaderBackground {
  private renderer: Renderer;
  private gl: OGLRenderingContext;
  private mesh: Mesh;
  private program: Program;
  private raf = 0;
  private startTime = Date.now();
  private mouse = { x: 0.5, y: 0.5 };
  private scrollY = 0;
  private maxScroll = 1;
  private paused = false;
  private frameSkip = false;
  private frameCount = 0;
  private isMobile: boolean;
  private observer: IntersectionObserver | null = null;
  private canvas: HTMLCanvasElement;

  constructor(options: ShaderBgOptions) {
    const {
      canvas,
      colors = ['#1a1410', '#8b4513', '#c4653a'],
      speed = 1,
    } = options;

    this.canvas = canvas;
    this.isMobile = 'ontouchstart' in window || window.innerWidth < 768;

    const dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new Renderer({
      canvas,
      dpr,
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(this.gl);

    this.program = new Program(this.gl, {
      vertex: `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: this.getFragmentShader(),
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: [canvas.width, canvas.height] },
        u_mouse: { value: [0.5, 0.5] },
        u_scroll: { value: 0 },
        u_color1: { value: hexToVec3(colors[0]) },
        u_color2: { value: hexToVec3(colors[1]) },
        u_color3: { value: hexToVec3(colors[2]) },
      },
    });

    this.mesh = new Mesh(this.gl, { geometry, program: this.program });

    this.resize();
    this.bindEvents();
    this.animate();
  }

  private getFragmentShader(): string {
    return `
precision highp float;

varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  float time = u_time * 0.3;

  vec2 mouseOffset = (u_mouse - 0.5) * 0.05;
  float scrollShift = u_scroll * 0.3;

  vec2 noiseCoord = uv * aspect * 1.5 + mouseOffset;
  float n1 = fbm(noiseCoord + vec2(time * 0.4, time * 0.2 + scrollShift));
  float n2 = fbm(noiseCoord * 0.8 + vec2(-time * 0.3, time * 0.15) + n1 * 0.4);

  float gradient = uv.x * 0.4 + uv.y * 0.6 + scrollShift * 0.2;
  float mix1 = clamp(gradient + n1 * 0.25 + n2 * 0.15, 0.0, 1.0);

  vec3 color;
  if (mix1 < 0.5) {
    color = mix(u_color1, u_color2, mix1 * 2.0);
  } else {
    color = mix(u_color2, u_color3, (mix1 - 0.5) * 2.0);
  }

  float vignette = 1.0 - length((uv - 0.5) * 1.4);
  vignette = smoothstep(0.0, 0.7, vignette);
  color *= vignette * 0.85 + 0.15;

  float bottomFade = smoothstep(0.0, 0.15, uv.y);
  gl_FragColor = vec4(color, bottomFade * 0.45);
}
    `;
  }

  private resize = () => {
    const w = this.canvas.parentElement?.clientWidth || window.innerWidth;
    const h = this.canvas.parentElement?.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h);
    this.program.uniforms.u_resolution.value = [w * this.renderer.dpr, h * this.renderer.dpr];
    this.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (this.isMobile) return;
    this.mouse.x = e.clientX / window.innerWidth;
    this.mouse.y = 1 - e.clientY / window.innerHeight;
  };

  private onScroll = () => {
    this.scrollY = window.scrollY / this.maxScroll;
  };

  private onVisibilityChange = () => {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  };

  private bindEvents() {
    window.addEventListener('resize', this.resize, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.resume();
        } else {
          this.pause();
        }
      },
      { threshold: 0 },
    );
    this.observer.observe(this.canvas);
  }

  private animate = () => {
    if (this.paused) return;

    this.frameCount++;
    if (this.isMobile && this.frameCount % 2 !== 0) {
      this.raf = requestAnimationFrame(this.animate);
      return;
    }

    const elapsed = (Date.now() - this.startTime) / 1000;
    this.program.uniforms.u_time.value = elapsed;
    this.program.uniforms.u_mouse.value = [this.mouse.x, this.mouse.y];
    this.program.uniforms.u_scroll.value = this.scrollY;

    this.renderer.render({ scene: this.mesh });
    this.raf = requestAnimationFrame(this.animate);
  };

  pause() {
    this.paused = true;
    cancelAnimationFrame(this.raf);
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.animate();
  }

  destroy() {
    this.pause();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.observer?.disconnect();
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
