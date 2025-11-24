import './card.css'

import Swal from 'sweetalert2';

export default function CardMembros({
	pessoa
}) {
	function modalInfos() {
		Swal.fire({
			width: 300,
			html: `
			<div class="d-flex flex-column justify-content-center align-items-center gap-3">
				<div class="overflow-hidden z-index-1 position-relative px-4" style="width:10rem">
					<img
						class="rounded-circle bordas2px bordaAzulGM border-4"
						src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						alt=""
						style="width:100%"
					/>
				</div>
				<div class="d-flex flex-column text-start justify-content-between border bg-secondary-subtle p-3 rounded w-100">
					<div><b>${pessoa.nome}</b></div>
					<div>Email: ${pessoa.email}</div>
					<div>Telefone: ${pessoa?.telefone ?? ''}</div>
				</div>
			</div>
			`
		})
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
					<a className="icon-sm bg-primary rounded-circle text-white" href="">
						<i className="bi bi-envelope"></i>
					</a>

					<a className="icon-sm bg-primary rounded-circle text-white" href="">
						<i className="bi bi-linkedin"></i>
					</a>

					<a className="icon-sm bg-primary rounded-circle text-white" href="">
						<i className="bi bi-telephone"></i>
					</a>
				</div>
			</div>
		</div>
	);
}
