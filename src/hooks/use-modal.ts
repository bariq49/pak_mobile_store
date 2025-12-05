import { useModalStore } from '@/stores/useModalStore';

export function useModal() {
    const { isOpen, view, data, openModal, closeModal } = useModalStore();
    return { isOpen, view, data, openModal, closeModal };
}
