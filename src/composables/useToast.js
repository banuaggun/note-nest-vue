import { ref } from "vue";

const message = ref("");
const visible = ref(false);

export function useToast() {
    function showToast(msg) {
        message.value = msg;
        visible.value = true;

        setTimeout(() => {
            visible.value = false;
        }, 2500);
    }

    return {
        message,
        visible,
        showToast
    };
}
