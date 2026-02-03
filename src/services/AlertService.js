import Swal from 'sweetalert2';

export class AlertService {

    async deleteConfirm() {
        const result = await Swal.fire({
            title: 'Tem certeza que deseja excluir?',
            icon: 'warning',
            iconColor: 'var(--error)',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            confirmButtonColor: 'var(--error)',
            cancelButtonText: 'Não, cancelar',
            reverseButtons: true,
            customClass: this.roundedDefault
        });
        return result.isConfirmed;
    }

    error(message) {
        Swal.fire({
            confirmButtonColor: 'var(--error)',
            icon: 'error',
            text: message,
            title: 'Oops...',
            customClass: this.roundedDefault
        });
    }

    roundedDefault = {
        popup: 'swal-rounded',
        confirmButton: 'swal-btn-rounded',
        cancelButton: 'swal-btn-rounded'
    }

}