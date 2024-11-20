<script setup>
import { ref, computed } from 'vue'
import index from './index.vue.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': index,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>