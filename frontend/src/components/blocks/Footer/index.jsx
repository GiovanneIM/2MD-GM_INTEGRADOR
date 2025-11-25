'use client'

import { usePathname } from 'next/navigation';


import './footer.css';


export default function Footer() {
  // Retornando uma tag vazia em páginas que não têm Navbar
  const pathname = usePathname();
  if (['/', '/login', '/dashboard', '/equipes'].includes(pathname)) {
    return <></>;
  }
    return <>
        {/* Footer */}
        <footer className='text-center text-lg-start bg-body-tertiary text-muted'>
            {/* Section: Social media */}
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                {/* Left */}
                <div className='me-5 d-none d-lg-block'>
                    <span>Entre em contato pelas nossas redes sociais:</span>
                </div>
                {/* Left */}
                {/* Right */}
                <div>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-facebook-f' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-twitter' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-google' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-instagram' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-linkedin' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <i className='fab fa-github' />
                    </a>
                </div>
                {/* Right */}
            </section>
            {/* Section: Social media */}
            {/* Section: Links  */}
            <section className=''>
                <div className='container text-center text-md-start p-2'>
                    {/* Grid row */}
                    <div className='row mt-3'>
                        {/* Grid column */}
                        <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                            {/* Content */}
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <i className='fas fa-gem me-3' />
                                G E N E R A L &nbsp;&nbsp;&nbsp; M O T O R S
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                        {/* Grid column */}
                        {/* Grid column */}
                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            {/* Links */}
                            <h6 className='text-uppercase fw-bold mb-4'>Treinamentos</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    ?
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    ?
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    ?
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    ?
                                </a>
                            </p>
                        </div>
                        {/* Grid column */}
                        {/* Grid column */}
                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                            {/* Links */}
                            <h6 className='text-uppercase fw-bold mb-4'>Links Úteis</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Home
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Dashboards
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Dúvidas
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Sobre
                                </a>
                            </p>
                        </div>
                        {/* Grid column */}
                        {/* Grid column */}
                        <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                            {/* Links */}
                            <h6 className='text-uppercase fw-bold mb-4'>Contato</h6>
                            <p>
                                <i className='fas fa-home me-3' /> São Caetano do Sul, Rua Santo André 680, SP
                            </p>
                            <p>
                                <i className='fas fa-envelope me-3' />
                                TreinamentosGM@gmail.com.br
                            </p>
                            <p>
                                <i className='fas fa-phone me-3' /> +55 (11) 98562-8455
                            </p>
                            <p>
                                <i className='fas fa-print me-3' /> +55  (11) 91845-9237
                            </p>
                        </div>
                        {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
            </section>
            {/* Section: Links  */}
            {/* Copyright */}
            <div
                className='text-center p-4'
                style={{ backgroundColor: 'rgba(80, 161, 253, 0.12)' }}
            >
                © {new Date().getFullYear()} GM — Todos os direitos reservados.
            </div>
            {/* Copyright */}
        </footer>
        {/* Footer */}
    </>
}
