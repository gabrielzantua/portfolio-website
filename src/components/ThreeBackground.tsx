'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// @ts-ignore – library lacks types
import SplineLoader from '@splinetool/loader'

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const { innerWidth: w, innerHeight: h } = window
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100000)
    camera.position.set(0, 0, 10)

    const scene = new THREE.Scene()

    const loader = new SplineLoader()
    loader.load(
      'https://prod.spline.design/KnAuKJJKp7tlAiku/scene.splinecode',
      (splineScene: any) => {
        scene.add(splineScene)
        // Frame camera to content
        const box = new THREE.Box3().setFromObject(splineScene)
        const size = box.getSize(new THREE.Vector3()).length()
        const center = box.getCenter(new THREE.Vector3())
        controls.target.copy(center)
        camera.position.copy(center.clone().add(new THREE.Vector3(0, 0, size)))
        camera.near = size / 100
        camera.far = size * 10
        camera.updateProjectionMatrix()
      }
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setClearAlpha(0)
    // transparent background so underlying body color shows
    scene.background = null

    containerRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.125

    function onWindowResize() {
      const { innerWidth, innerHeight } = window
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }

    window.addEventListener('resize', onWindowResize)

    renderer.setAnimationLoop(() => {
      controls.update()
      renderer.render(scene, camera)
    })

    return () => {
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', onWindowResize)
      renderer.dispose()
      controls.dispose()
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" />
}
