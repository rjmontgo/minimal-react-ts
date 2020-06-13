import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import ThreeLib from "three-js";

var three = ThreeLib();

function renderLogic(canvasRef) {
  const renderer = new three.WebGLRenderer({canvas: canvasRef});
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new three.Scene();
  
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const geometry = new three.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new three.MeshPhongMaterial({color: 0x44aa88});

  const boxMesh = new three.Mesh(geometry, material);

  scene.add(boxMesh);

  // light
  { 
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new three.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  function loop(time) {
    time *= 0.001;
    boxMesh.rotation.x = time;
    boxMesh.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  renderer.render(scene, camera);

}

export const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    renderLogic(canvasRef.current);
  },[canvasRef])

  return (
    <canvas ref={canvasRef} id="canvas"></canvas>
  )
}
