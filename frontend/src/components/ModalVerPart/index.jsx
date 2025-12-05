'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import CardMembros from '../CardTimes/Card';

const ModalVerPart = forwardRef(({ participantes = [] }, ref) => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        // só inicializa no cliente
        if (typeof window !== 'undefined' && modalRef.current) {
            import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
                modalInstance.current = new window.bootstrap.Modal(modalRef.current);
            });
        }
    }, []);

    useImperativeHandle(ref, () => ({
        open() {
            if (modalInstance.current) modalInstance.current.show();
        },
        close() {
            if (modalInstance.current) modalInstance.current.hide();
        }
    }));

    return (
        <div ref={modalRef} className='modal fade' tabIndex='-1'>
            <div className='modal-dialog'>
                <div className='modal-content col-8'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Participantes</h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                        ></button>
                    </div>
                    <div className='modal-body d-flex flex-wrap gap-3 align-items-center justify-content-center'>
                        {participantes.length === 0 && <p>Nenhum participante</p>}
                        {participantes.map((p) => (
                            <CardMembros pessoa={p} key={p.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModalVerPart;
