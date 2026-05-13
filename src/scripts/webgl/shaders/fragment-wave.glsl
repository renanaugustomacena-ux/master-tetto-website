precision highp float;

varying vec2 vUv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

// Simplex-style noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
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

  // Mouse influence (subtle parallax)
  vec2 mouseOffset = (u_mouse - 0.5) * 0.05;

  // Scroll influence shifts gradient
  float scrollShift = u_scroll * 0.3;

  // Noise layers
  vec2 noiseCoord = uv * aspect * 1.5 + mouseOffset;
  float n1 = fbm(noiseCoord + vec2(time * 0.4, time * 0.2 + scrollShift));
  float n2 = fbm(noiseCoord * 0.8 + vec2(-time * 0.3, time * 0.15) + n1 * 0.4);

  // Gradient base (diagonal, shifted by scroll)
  float gradient = uv.x * 0.4 + uv.y * 0.6 + scrollShift * 0.2;

  // Mix noise into gradient
  float mix1 = gradient + n1 * 0.25 + n2 * 0.15;
  mix1 = clamp(mix1, 0.0, 1.0);

  // Three-color palette interpolation
  vec3 color;
  if (mix1 < 0.5) {
    color = mix(u_color1, u_color2, mix1 * 2.0);
  } else {
    color = mix(u_color2, u_color3, (mix1 - 0.5) * 2.0);
  }

  // Vignette
  float vignette = 1.0 - length((uv - 0.5) * 1.4);
  vignette = smoothstep(0.0, 0.7, vignette);
  color *= vignette * 0.85 + 0.15;

  // Bottom fade for content integration
  float bottomFade = smoothstep(0.0, 0.15, uv.y);
  float alpha = bottomFade * 0.45;

  gl_FragColor = vec4(color, alpha);
}
