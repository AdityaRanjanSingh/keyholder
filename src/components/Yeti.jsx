/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Yeti.gltf -o src/components/Yeti.jsx 
*/

import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export default (props) => {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/models/Yeti.gltf");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <skinnedMesh
            name="Yeti_Blob001"
            geometry={nodes.Yeti_Blob001.geometry}
            material={materials.Atlas}
            skeleton={nodes.Yeti_Blob001.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/Yeti.gltf");
