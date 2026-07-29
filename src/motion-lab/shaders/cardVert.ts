export default /* glsl */`
varying vec2 vUv;
uniform float uVelocity;
uniform float uBend;
void main(){
  vUv=uv;
  vec3 pos=position;
  float wave=sin(uv.x*3.14159);
  pos.y+=wave*uVelocity*uBend;
  pos.x+=(uv.x-0.5)*abs(uVelocity)*uBend*0.4;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
}
`;
