import { onMounted, onUnmounted, type Ref } from 'vue';

export function useClickOutside(element: Ref<HTMLElement | null>, callback: () => void) {
  function handleClick(event: Event) {
    if (element.value && !element.value.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });
}