


import { watchEffect, type Ref } from 'vue';

export function useLeaveConfirmation(hasUnsavedChanges: Ref<boolean>) {
    watchEffect((onCleanup) => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (hasUnsavedChanges.value) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        if (hasUnsavedChanges.value) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        onCleanup(() => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        });
    });
}
