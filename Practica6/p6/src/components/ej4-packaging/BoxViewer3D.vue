<template>
  <div ref="container" class="viewer-3d"></div>
  <div v-if="showToast" class="toast">
    📦 Dimensiones: {{ width }}cm × {{ height }}cm × {{ depth }}cm
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  width: number
  height: number
  depth: number
  color: string
}>()

const container = ref<HTMLDivElement>()
const showToast = ref(false)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let box: THREE.Mesh
let animationId: number

onMounted(() => {
  if (!container.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ 
    color: props.color,
    roughness: 0.7,
    metalness: 0.1
  })
  box = new THREE.Mesh(geometry, material)
  scene.add(box)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const onClick = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(box)

    if (intersects.length > 0) {
      showToast.value = true
      setTimeout(() => showToast.value = false, 3000)
    }
  }

  renderer.domElement.addEventListener('click', onClick)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    box.rotation.x += 0.005
    box.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    renderer.domElement.removeEventListener('click', onClick)
    renderer.dispose()
    container.value?.removeChild(renderer.domElement)
  })
})

watch(() => [props.width, props.height, props.depth], ([w, h, d]) => {
  if (box) box.scale.set(w / 10, h / 10, d / 10)
})

watch(() => props.color, (newColor) => {
  if (box) (box.material as THREE.MeshStandardMaterial).color.set(newColor)
})
</script>

<style scoped>
.viewer-3d {
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #2d3748;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  z-index: 1000;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
