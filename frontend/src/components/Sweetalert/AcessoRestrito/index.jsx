'use client';

import Swal from 'sweetalert2';

export default function AcessoRestrito({
    text,
}) {
    Swal.fire({
        scrollbarPadding: false,
        heightAuto: false,

        // Atributos do botão
        title: 'Acesso negado',
        html: text,
        icon: 'error',
        backdrop: '#0956FF',

        // Impedindo de ser fechado
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,

        // Timer
        timer: 3500,
        timerProgressBar: true,
    })

    return null;
}