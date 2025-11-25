import './card.css'

import Swal from 'sweetalert2';

export default function CardMembros({
	pessoa
}) {
	function modalInfos() {
		Swal.fire({
			width: 380,
			background: '#f4f6f8',
			showConfirmButton: false,
			html: `
			<div class="gm-container">
	
				<!-- Foto do usuário -->
				<div class="gm-photo-wrapper">
					<img
						class="gm-photo"
						src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						alt="Foto"
					/>
				</div>
	
				<!-- Card de informações -->
				<div class="gm-card">
					<div class="gm-name">${pessoa.nome}</div>
					<div class="gm-info"><strong>Email:</strong> ${pessoa.email}</div>
					<div class="gm-info"><strong>Telefone:</strong> ${pessoa.telefone}</div>
				</div>
	
			</div>
			`
		});
	}
	

	return (
		<div className="card-funcionario text-center bg-white p-3 shadow rounded" onClick={modalInfos}>
			<div className="overflow-hidden z-index-1 position-relative px-4">
				<img
					className="rounded-circle bordas2px bordaAzulGM border-4"
					src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
					alt=""
				/>
			</div>

			<div className=" rounded-3 mt-n3 card-body">
				<h6 className="fw-700 dark-color mb-1" style={{height: '50px'}}>{pessoa.nome}</h6>
				<small>{
					pessoa.tipo === 'ft' ? ('Facilitador de time') : ('Membro de time')
				}</small>

				<div className="pt-2 card-icons gap-1">
					<a className="icon-sm bg-primary rounded-circle text-white" href="https://www.gmail.com/mail/help/intl/pt_pt/about.html?linkId=75998329">
						<i className="bi bi-envelope"></i>
					</a>

					<a className="icon-sm bg-primary rounded-circle text-white" href="https://www.linkedin.com/">
						<i className="bi bi-linkedin"></i>
					</a>

					<a className="icon-sm bg-primary rounded-circle text-white" href="https://play.google.com/store/apps/details?id=com.google.android.dialer&hl=pt-BR&pli=1">
						<i className="bi bi-telephone"></i>
					</a>
				</div>
			</div>
		</div>
	);
}
