'use client'

import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

import './navbar.css'

import LogoGM from '@/components/LogoGM';
import AcessoRestrito from '@/components/Sweetalert/AcessoRestrito';

export default function Navbar() {
	const [usuario, setUsuario] = useState([]);
	const [acesso, setAcesso] = useState(null);

	/* Carregando o usuário logado */
	useEffect(() => {
		try {
			async function carregarUsuario() {
				const res = await fetch('http://localhost:3000/api/auth/perfil', {
					headers: {
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					}
				});
				const data = await res.json();

				// Verificando se há um usuário logado
				if (data.sucesso) {
					// console.log(data);

					sessionStorage.setItem('usuario', JSON.stringify(data.dados))
					setUsuario(data.dados)

					setAcesso(true)
				}
				else {
					setAcesso(false)
				}
			}

			carregarUsuario()
		}
		catch {
			setAcesso(false)
		}
	}, [])


	// Retornando uma tag vazia em páginas que não têm Navbar
	const pathname = usePathname();
	if (['/', '/login'].includes(pathname)) {
		return <>
		</>;
	}
	// NAVBAR
	else if (acesso) return (
		<nav className="z-3 d-flex flex-row flex-lg-column align-items-center shadow bg-white border rounded m-lg-3 py-3 px-2 px-lg-0 me-lg-0">
			{/* Foto de perfil */}
			<div className="navbar__item d-flex align-items-center justify-content-center">
				<a href="/perfil" className="navbar__link rounded d-flex align-items-center justify-content-center">
					<div className='rounded overflow-hidden' style={{ width: '3.75rem', border: '0.22rem black solid' }}>
						<img src={usuario.imagem ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} className='imgCompleta' />
					</div>
					<span className='rounded fw-bold d-none d-lg-block bg-black'>Perfil</span>
				</a>
			</div>

			{/* Navbar - Tablet e Desktop */}
			<div className="navbar__menu flex-grow-1 d-none d-sm-flex flex-lg-column justify-content-center flex-wrap row-gap-2 p-3">
				{/* Home */}
				<div className="navbar__item d-flex align-items-center justify-content-center">
					<a href={`/${usuario.tipo}/dashboard`} className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
							<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Inicio</span>
					</a>
				</div>

				{/* Mensagens */}
				<div className="navbar__item d-flex align-items-center justify-content-center">
					<a href="#" className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
							<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Mensagens</span>
					</a>
				</div>

				{/* Projetos */}
				<div className="navbar__item d-flex align-items-center justify-content-center">
					<a href="#" className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
							<path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Treinamentos</span>
					</a>
				</div>

				{/* Equipes */}
				<div className="navbar__item d-flex align-items-center justify-content-center">
					<a href="/equipes" className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
							<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Equipes</span>
					</a>
				</div>

				{/* Ajuda */}
				<div className="navbar__item d-flex aling-item-center justify-content-center">
					<a href="#" className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Dúvidas</span>
					</a>
				</div>

				{/* Configurações */}
				{/* <div className="navbar__item d-flex aling-item-center justify-content-center">
					<a href="#" className="navbar__link rounded d-flex align-items-center justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
							<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
							<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
						</svg>
						<span className='rounded fw-bold d-none d-lg-block'>Configurações</span>
					</a>
				</div> */}
			</div>

			{/* Dropup - Celular */}
			<div className="flex-grow-1 d-sm-none btn-group dropup">
				<button
					type="button" className="btn btn-secondary dropdown-toggle mx-3"
					data-bs-toggle="dropdown" aria-expanded="false"
				>
					Navegação
				</button>

				<ul className="dropdown-menu">
					{/* Home */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
								<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
							</svg>
							<span className='rounded fw-bold'>Inicio</span>
						</a>
					</div>

					{/* Mensagens */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
								<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
								<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
							</svg>
							<span className='rounded fw-bold'>Mensagens</span>
						</a>
					</div>

					{/* Projetos */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="#" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
								<path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
							</svg>
							<span className='rounded fw-bold'>Treinamentos</span>
						</a>
					</div>

					{/* Equipes */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="/equipes" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
								<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
							</svg>
							<span className='rounded fw-bold'>Equipes</span>
						</a>
					</div>

					{/* Ajuda */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14" />
							</svg>
							<span className='rounded fw-bold'>Dúvidas</span>
						</a>
					</div>

					{/* Configurações */}
					<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom">
						<a href="" className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
								<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
								<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
							</svg>
							<span className='rounded fw-bold'>Configurações</span>
						</a>
					</div>
				</ul>
			</div>

			{/* Tema e Logo da GM */}
			<div className='d-flex flex-lg-column'>
				{/* Tema */}
				<div className="position-relative theme-wrapper me-2 me-lg-0 mb-lg-2 col-lg-12 d-flex justify-content-center align-items-center">

					{/* Botão para selecionar o tema */}
					<div className="bordas bordaCinza rounded-circle d-flex align-items-center justify-content-center theme-trigger"
						style={{ width: '2.5rem', height: '2.5rem', cursor: "pointer" }}
					>
						<i className="bi bi-palette fs-5"></i>
					</div>

					{/* Div flutuante com as opções */}
					<div className="theme-popup shadow p-2 rounded bordas bordaCinza">

						<div className="rounded-circle d-flex align-items-center justify-content-center me-2 theme-option"
							style={{ width: '2.5rem', height: '2.5rem' }}
						>
							<i className="bi bi-sun fs-5"></i>
						</div>

						<div className="rounded-circle d-flex align-items-center justify-content-center theme-option"
							style={{ width: '2.5rem', height: '2.5rem' }}
						>
							<i className="bi bi-moon fs-5"></i>
						</div>

					</div>
				</div>


				<LogoGM tamanho={55} cor={'black'} />
			</div>
		</nav>
	)
	// Se não há um usuário logado
	else if (acesso === false) return (
		<div>
			{/* Alerta de Acesso negado */}
			<AcessoRestrito text={`
				Você precisa estar logado para navegar pelo site</b>.<br>
				Você será redirecionado em alguns segundos
			`} />

			{/* Redirecionando o usuário */}
			{
				setTimeout(() => { window.location.href = '/login' }, 3400)
			}
		</div>
	);
}
