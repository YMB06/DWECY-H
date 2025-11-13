import { onMounted, onUnmounted, type Ref } from 'vue';

export function useScrollDetector(element: Ref<HTMLElement | null>, callback: () => void) {
    const buffer = 100;

    function handleScroll() {
        if (!element.value) return;
        
        const { scrollHeight, scrollTop, clientHeight } = element.value;
        if (scrollHeight - scrollTop <= clientHeight + buffer) {
            callback();
        }
    }

    onMounted(() => {
        if (element.value) {
            element.value.addEventListener('scroll', handleScroll);
        }
    });

    onUnmounted(() => {
        if (element.value) {
            element.value.removeEventListener('scroll', handleScroll);
        }
    });
}