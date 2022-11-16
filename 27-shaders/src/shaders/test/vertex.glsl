uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;

attribute vec3 position;

void main(){
   // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
   vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
   modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;
   
   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectedPosition = projectionMatrix * viewPosition;
   // modelPosition.z += aRandom * 0.1;

   gl_Position = projectedPosition;
}