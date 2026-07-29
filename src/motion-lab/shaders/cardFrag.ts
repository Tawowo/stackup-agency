export default /* glsl */`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uHue;
uniform float uHover;
uniform float uDim;
uniform float uZoom;
vec3 hsl2rgb(vec3 c){
  vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
  return c.z+c.y*(rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
void main(){
  vec2 uv=(vUv-0.5)/mix(1.0,uZoom,uHover)+0.5;
  vec2 c=uv-0.5;
  float ang=atan(c.y,c.x);
  float rad=length(c);
  float flow=noise(uv*3.0+uTime*0.15)*0.5+noise(uv*6.0-uTime*0.1)*0.25;
  float l=0.42+0.28*sin(ang*1.5+flow*4.0)+flow*0.15;
  vec3 col=hsl2rgb(vec3(fract(uHue+rad*0.15+flow*0.08),0.62,l));
  float sheen=smoothstep(0.35,0.0,abs(uv.x-uv.y-sin(uTime*0.3)*0.4));
  col+=sheen*0.12*(0.5+uHover);
  col*=smoothstep(0.95,0.35,rad);
  col*=1.0+uHover*0.25;
  col*=1.0-uDim;
  gl_FragColor=vec4(col,1.0);
}
`;
