void main(){
   // float strength = distance(gl_PointCoord, vec2(0.5));
   // strength = step(0.5, strength);
   // strength = 1.0 - strength;

   // float strength = distance(gl_PointCoord, vec2(0.5));
   // strength *= 0.2;
   // strength = 1.0 -strength;

   // float strength = distance(gl_PointCoord, vec2(0.5));
   // strength *= 0.2;
   // strength = 1.0 -strength;

   gl_FragColor = vec4(vec3(strength), 1.0);
}