'use client'

import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

import './navbar.css'

import LogoGM from '@/components/LogoGM';
import AcessoRestrito from '@/components/Sweetalert/AcessoRestrito';

export default function Navbar() {
	const [usuario, setUsuario] = useState(null);
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

	// Objeto com os links, ícones e textos
	const links = [
		{
			link: '/calendario',
			texto: 'Calendário',
			icone: 'bi bi-calendar-week'
		},
		{
			link: '/verTreinamentos',
			texto: 'Treinamentos',
			icone: 'bi bi-bar-chart-line'
		},
		{
			link: '#',
			texto: 'Mensagens',
			icone: 'bi bi-chat-left-text'
		},
		{
			link: '/equipes',
			texto: 'Equipes',
			icone: 'bi bi-people'
		},
		{
			link: '#',
			texto: 'Dúvidas',
			icone: 'bi bi-question-lg'
		},
		{
			link: '#',
			texto: 'Configurações',
			icone: 'bi bi-gear'
		}
	]


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
						<i className='bi bi-house fs-4'></i>
						<span className='rounded fw-bold d-none d-lg-block'>Inicio</span>
					</a>
				</div>

				{links.map((lk, index) =>
					<div className="navbar__item d-flex align-items-center justify-content-center" key={index}>
						<a href={`${lk.link}`} className="navbar__link rounded d-flex align-items-center justify-content-center">
							<i className={`${lk.icone} fs-4`}></i>
							<span className='rounded fw-bold d-none d-lg-block'>{lk.texto}</span>
						</a>
					</div>
				)}

			</div>

			{/* Dropup - Celular */}
			<div className="flex-grow-1 d-sm-none btn-group dropup">
				<button
					type="button" className="btn btn-secondary dropdown-toggle mx-3"
					data-bs-toggle="dropdown" aria-expanded="false"
				>Navegação
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

					{links.map((lk) =>
						<div className="navbarItem_Cel d-flex align-items-center px-3 border-bottom" key={index}>
							<a href={`${lk.link}`} className="navbarLink_Cel rounded d-flex align-items-center justify-content-center">
								<i className={`${lk.icone} fs-4`}></i>
								<span className='rounded fw-bold'>{lk.texto}</span>
							</a>
						</div>
					)}
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
