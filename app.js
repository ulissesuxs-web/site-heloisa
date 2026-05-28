/**
 * ==========================================================================
 * DRA. HELOISA PIERINI ADVOCACIA - JAVASCRIPT PRINCIPAL (SPA)
 * Lógica de componentes interativos, Blog dinâmico, Portal do Cliente e Agenda
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializações de componentes principais
    initMobileMenu();
    initStickyHeader();
    initBlogEngine();
    initClientPortal();
    initBookingAgenda();
});

/**
 * 1. CONTROLE DO MENU MOBILE RESPONSIVO & ROLAGEM SUAVE
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('#site-nav a');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            siteNav.classList.toggle('active');
            
            // Alterna o ícone de hambúrguer para X
            const icon = navToggle.querySelector('i');
            if (siteNav.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Fecha o menu ao clicar em qualquer link (para UX fluida em âncoras SPA)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('active');
                navToggle.querySelector('i').className = 'fa-solid fa-bars';
                
                // Atualiza classe ativa de navegação visual
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Fecha o menu se o usuário clicar fora dele
        document.addEventListener('click', (e) => {
            if (siteNav.classList.contains('active') && !siteNav.contains(e.target) && e.target !== navToggle) {
                siteNav.classList.remove('active');
                navToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }
}

/**
 * ADICIONA EFEITO DE STICKY HEADER E COMPORTAMENTO DE COR COM ROLAGEM
 */
function initStickyHeader() {
    const header = document.getElementById('site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
        
        // Verifica no carregamento inicial da página caso já esteja rolado
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        }
    }
}

/**
 * 2. MOTOR DE BLOG DINÂMICO COM BASE DE DADOS LOCAL E FILTROS
 */
const BLOG_POSTS_DATA = [
    {
        id: "voo-atrasado-cancelado",
        title: "Voo Atrasado ou Cancelado? Conheça Seus Direitos",
        date: "28 Mai 2026",
        category: "VooCancelado",
        instagramUrl: "https://www.instagram.com/p/C-voo-atrasado-cancelado/",
        iconClass: "fa-solid fa-plane-slash",
        excerpt: "Ter um voo atrasado ou cancelado é extremamente frustrante. Conheça as regras rígidas da ANAC e saiba quais assistências e indenizações você tem direito imediato.",
        contentHtml: `
            <h2>Resolução nº 400 da ANAC e Seus Direitos</h2>
            <p>Ter um voo atrasado ou cancelado é uma das experiências mais frustrantes para quem viaja. Seja por motivos de negócios ou férias, o imprevisto gera estresse, cansaço e prejuízos. No entanto, o passageiro não está desamparado. A Resolução nº 400 da ANAC (Agência Nacional de Aviação Civil) garante direitos claros de <strong>assistência material</strong> e <strong>indenização</strong> que você precisa conhecer.</p>
            
            <h3>🕒 Assistência Material Gradual</h3>
            <p>A assistência é gratuita e deve ser oferecida de forma gradual pela companhia aérea de acordo com o tempo de espera no aeroporto:</p>
            <ul>
                <li><strong>A partir de 1 hora de atraso:</strong> Facilidades de comunicação (internet, ligações telefônicas).</li>
                <li><strong>A partir de 2 horas de atraso:</strong> Alimentação adequada (vouchers para lanches ou refeições).</li>
                <li><strong>A partir de 4 horas de atraso:</strong> Acomodação em local adequado, hospedagem (se houver pernoite) e transporte de ida e volta ao aeroporto.</li>
            </ul>
            
            <h3>✈️ Suas Opções Diante de Atraso Superior a 4 Horas ou Cancelamento</h3>
            <p>Caso o voo atrase mais de 4 horas, seja cancelado ou ocorra preterição de embarque, a companhia aérea deve oferecer imediatamente as seguintes opções de escolha para o passageiro:</p>
            <ul>
                <li><strong>Reacomodação:</strong> Em voo próprio ou de terceiros na primeira oportunidade disponível.</li>
                <li><strong>Reembolso Integral:</strong> De todo o valor pago pela passagem, incluindo as taxas aeroportuárias.</li>
                <li><strong>Execução do serviço por outro meio de transporte:</strong> Como ônibus ou táxi, por conta da empresa.</li>
            </ul>
            
            <div class="note-alert">
                <strong>⚠️ IMPORTANTE:</strong> Guarde todos os comprovantes! Cartões de embarque, e-mails de aviso, fotos do painel do aeroporto e notas fiscais de gastos com alimentação e transporte são fundamentais para comprovar o ocorrido.
            </div>
            
            <h3>💼 Quando Cabe Indenização por Danos Morais?</h3>
            <p>Se o atraso ou cancelamento gerar a perda de um compromisso importante (como um casamento, reunião de negócios, início de um cruzeiro ou diárias de hotel reservadas), você tem direito a buscar uma <strong>indenização por danos morais</strong> no valor médio de R$ 5.000 a R$ 10.000.</p>
            <p>O entendimento da Justiça brasileira é de que a falha na prestação do serviço aéreo gera abalo psicológico indenizável.</p>
        `
    },
    {
        id: "extravio-de-bagagem",
        title: "Extravio de Bagagem: O Guia Completo para Evitar Prejuízos",
        date: "27 Mai 2026",
        category: "ExtravioDeBagagem",
        instagramUrl: "https://www.instagram.com/p/C-extravio-de-bagagem/",
        iconClass: "fa-solid fa-suitcase-rolling",
        excerpt: "Chegar ao destino de viagem e perceber que sua mala sumiu é um pesadelo. Aja de forma rápida, registre o PIR imediatamente e garanta assistência emergencial da aérea.",
        contentHtml: `
            <h2>Passos Práticos Diante de Bagagem Perdida</h2>
            <p>Chegar ao seu destino de viagem e perceber que sua mala não apareceu na esteira de bagagens é um pesadelo frequente. No entanto, desespero não resolve o problema. Aja de forma rápida e estratégica para garantir que a companhia aérea localize seus pertences ou indenize você integralmente pelos prejuízos sofridos.</p>
            
            <h3>📋 Passo 1: Preencha o RIB / PIR Imediatamente</h3>
            <p>Não saia da área de desembarque sem preencher o <strong>RIB (Relatório de Irregularidade de Bagagem)</strong>, conhecido internacionalmente como <strong>PIR (Property Irregularity Report)</strong>.</p>
            <ul>
                <li>Vá direto ao balcão da companhia aérea responsável pelo seu último trecho de voo.</li>
                <li>Apresente o comprovante de despacho da bagagem (adesivo colado na passagem).</li>
                <li>Descreva detalhadamente a aparência da mala (marca, cor, tamanho, tags de identificação).</li>
                <li>Exija uma cópia assinada do relatório físico ou o código de rastreamento digital.</li>
            </ul>
            
            <h3>🛍️ Passo 2: Ajuda de Custo para Despesas de Emergência</h3>
            <p>Se você estiver fora de sua cidade de residência, a companhia aérea é obrigada a pagar uma <strong>ajuda de custo</strong> para a compra de itens de primeira necessidade (higiene pessoal e roupas básicas) enquanto sua bagagem estiver desaparecida.</p>
            <p>Guarde absolutamente todos os recibos de compras emergenciais feitas no período!</p>
            
            <h3>⏱️ Quais os Prazos para Localização da Mala?</h3>
            <p>Segundo as regras da ANAC, a companhia aérea tem prazos rígidos para localizar e entregar sua bagagem:</p>
            <ul>
                <li><strong>Voos Nacionais:</strong> Até <strong>7 dias</strong>.</li>
                <li><strong>Voos Internacionais:</strong> Até <strong>21 dias</strong>.</li>
            </ul>
            <p>Se a bagagem não for entregue dentro desses prazos, ela é considerada <strong>extraviada</strong>, e a empresa deve iniciar o reembolso financeiro.</p>
            
            <h3>💰 Indenização e Danos Morais</h3>
            <p>Se a mala for perdida permanentemente ou entregue com grande atraso (estragando dias das suas férias), você tem direito a buscar indenização por danos materiais e danos morais na Justiça.</p>
            
            <div class="note-alert">
                <strong>💡 DICA DE OURO:</strong> Ao viajar com itens de alto valor, declare o valor dos bens no momento do despacho mediante o preenchimento da Declaração de Valor da Bagagem, pagando uma taxa adicional para garantir o reembolso integral do valor real do bem em caso de extravio.
            </div>
        `
    },
    {
        id: "no-show-cancelamento",
        title: "Cancelamento de Volta por No-Show na Ida: Direitos",
        date: "26 Mai 2026",
        category: "NoShow",
        instagramUrl: "https://www.instagram.com/p/C-no-show-cancelamento/",
        iconClass: "fa-solid fa-ban",
        excerpt: "Você sabia que o cancelamento automático do seu voo de volta porque você não embarcou no voo de ida é considerado totalmente abusivo e ilegal no Brasil? Descubra.",
        contentHtml: `
            <h2>A Ilegalidade do Cancelamento do Voo de Volta</h2>
            <p>Você comprou passagens de ida e volta para uma viagem. Por algum imprevisto, perdeu o voo de ida (ou preferiu ir por outro meio de transporte). Ao chegar ao aeroporto para embarcar no voo de volta, é surpreendido com a notícia de que sua passagem de volta foi <strong>cancelada automaticamente</strong> pela companhia aérea devido ao "No-Show" na ida.</p>
            <p>Essa situação absurda é extremamente comum nos aeroportos do Brasil, mas você sabia que a Justiça brasileira considera essa prática <strong>totalmente abusiva e ilegal</strong>?</p>
            
            <h3>⚖️ O Entendimento da Justiça: Venda Casada Indireta</h3>
            <p>O Superior Tribunal de Justiça (STJ) entende que o cancelamento automático do voo de volta configura uma prática abusiva chamada <strong>venda casada indireta</strong>.</p>
            <ul>
                <li>O consumidor pagou por ambos os trechos (ida e volta). As passagens pertencem a ele.</li>
                <li>A ausência no primeiro voo não causa prejuízo financeiro à companhia aérea, que pode revender o assento vago de ida.</li>
                <li>Obrigar o passageiro a comprar uma nova passagem de volta de última hora por valores absurdos gera enriquecimento sem causa por parte da empresa aérea.</li>
            </ul>
            
            <h3>🚨 O que Fazer se Isso Acontecer com Você?</h3>
            <p>Caso a companhia aérea tente impedir seu embarque no voo de volta por causa de no-show na ida:</p>
            <ol>
                <li><strong>Exija o embarque:</strong> Argumente civilizadamente citando que a prática é considerada ilegal pelo STJ e pelo Código de Defesa do Consumidor.</li>
                <li><strong>Grave a conversa:</strong> Se houver recusa, grave o atendimento e exija uma declaração por escrito do motivo da negativa de embarque.</li>
                <li><strong>Compre outra passagem se necessário:</strong> Guarde os comprovantes de pagamento e passagens.</li>
                <li><strong>Acione a Justiça:</strong> Você tem direito ao reembolso da nova passagem adquirida e a uma robusta <strong>indenização por danos morais</strong> pelos constrangimentos.</li>
            </ol>
        `
    },
    {
        id: "overbooking-pretericao",
        title: "Overbooking e Preterição de Embarque: O que Fazer",
        date: "25 Mai 2026",
        category: "Overbooking",
        instagramUrl: "https://www.instagram.com/p/C-overbooking-pretericao/",
        iconClass: "fa-solid fa-chair",
        excerpt: "Foi impedido de embarcar por voo lotado? Descubra o direito de indenização imediata em dinheiro (DES) e as regras rígidas da ANAC para proteção do viajante.",
        contentHtml: `
            <h2>Seus Direitos Imediatos Contra o Overbooking</h2>
            <p>Imagine chegar ao portão de embarque com suas passagens compradas, documentos em mãos, check-in realizado dentro do prazo e receber a notícia de que <strong>não há assento disponível</strong> para você na aeronave. Essa situação é conhecida como <strong>preterição de embarque</strong> e, na grande maioria das vezes, é causada por <strong>overbooking</strong>.</p>
            
            <h3>⚖️ Direitos Imediatos em Caso de Preterição de Embarque</h3>
            <p>Conforme a Resolução nº 400 da ANAC, quando a empresa aérea precisar preterir um passageiro contra a sua vontade, ela deve adotar medidas específicas e imediatas:</p>
            
            <h4>1. Procura por Voluntários</h4>
            <p>Antes de impedir o embarque de qualquer pessoa, a companhia deve procurar por passageiros voluntários que aceitem embarcar em outro voo ou receber outra compensação mediante acordo assinado.</p>
            
            <h4>2. Pagamento de Compensação Financeira Imediata (DES)</h4>
            <p>Se você <strong>não se voluntariou</strong> e foi impedido de embarcar, a companhia aérea é obrigada a pagar a você, imediatamente no aeroporto, uma indenização chamada <strong>DES (Direito Especial de Saque)</strong>:</p>
            <ul>
                <li><strong>Voos Nacionais:</strong> Indenização imediata de <strong>250 DES</strong> (aproximadamente R$ 1.800,00 a R$ 2.000,00).</li>
                <li><strong>Voos Internacionais:</strong> Indenização imediata de <strong>500 DES</strong> (aproximadamente R$ 3.600,00 a R$ 4.000,00).</li>
            </ul>
            <p>Este valor deve ser pago em dinheiro, transferência bancária ou cheque na hora do ocorrido, independente de outras assistências.</p>
            
            <h3>🕒 Opções de Reacomodação e Assistência Material</h3>
            <p>Além da compensação em dinheiro, você tem direito a escolher entre:</p>
            <ul>
                <li>Reacomodação em voo próprio ou de terceiros na primeira oportunidade.</li>
                <li>Reembolso integral da passagem.</li>
                <li>Transporte por outro meio.</li>
            </ul>
            <p>A empresa também deve fornecer a assistência material gradual durante o período de espera no aeroporto.</p>
        `
    },
    {
        id: "como-comprovar-danos",
        title: "Como Comprovar Danos Morais em Problemas com Aéreas",
        date: "24 Mai 2026",
        category: "DanosMorais",
        instagramUrl: "https://www.instagram.com/p/C-como-comprovar-danos/",
        iconClass: "fa-solid fa-gavel",
        excerpt: "Ganhar uma indenização exige provas robustas. Conheça a lista completa de documentos, fotos e comprovantes que você deve recolher no aeroporto para processar a aérea.",
        contentHtml: `
            <h2>Como Montar um Dossiê de Provas Contra a Companhia Aérea</h2>
            <p>Entrar com uma ação na Justiça contra uma companhia aérea por atraso, cancelamento ou extravio de bagagem é um direito de todo consumidor lesado. Contudo, para que a ação seja vitoriosa, o passageiro precisa apresentar provas sólidas do ocorrido.</p>
            <p>A Justiça brasileira analisa as provas anexadas ao processo para medir a gravidade do dano e estipular o valor da indenização.</p>
            
            <h3>📂 1. Documentos Básicos da Viagem (Obrigatórios)</h3>
            <ul>
                <li>E-mail de confirmação da compra da passagem ou o bilhete eletrônico.</li>
                <li><strong>Cartão de embarque (Boarding Pass)</strong> de todos os trechos (físico ou no app).</li>
                <li><strong>Comprovante de despacho de bagagem</strong> (essencial em extravios).</li>
            </ul>
            
            <h3>📝 2. Declarações Oficiais da Companhia Aérea</h3>
            <ul>
                <li><strong>Declaração de Atraso ou Cancelamento de Voo:</strong> Vá ao balcão e exija um documento por escrito justificando o motivo do atraso/cancelamento.</li>
                <li><strong>RIB / PIR (Relatório de Irregularidade de Bagagem):</strong> O documento de extravio preenchido no desembarque.</li>
            </ul>
            
            <h3>📷 3. Evidências de Imagem e Comunicação</h3>
            <ul>
                <li><strong>Fotos do painel do aeroporto</strong> mostrando o voo atrasado ou cancelado.</li>
                <li><strong>Fotos de filas enormes</strong> e aglomeração de passageiros.</li>
                <li><strong>Prints de telas</strong> de e-mails, SMS ou notificações no app da empresa aérea.</li>
                <li><strong>Vídeos rápidos</strong> documentando a falta de assistência no local.</li>
            </ul>
            
            <h3>🧾 4. Comprovantes de Gastos Extras (Danos Materiais)</h3>
            <p>Guarde notas fiscais de despesas causadas diretamente pelo atraso/cancelamento:</p>
            <ul>
                <li>Recibos de táxi, Uber ou transfer.</li>
                <li>Notas fiscais de refeições feitas durante a espera.</li>
                <li>Comprovantes de diárias de hotéis perdidas ou reservas de passeios perdidos.</li>
            </ul>
        `
    }
];

function initBlogEngine() {
    const blogGrid = document.getElementById('blog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogModal = document.getElementById('blog-modal');
    const closeBlogModal = document.getElementById('close-blog-modal');
    const modalContentContainer = document.getElementById('modal-article-content');

    if (!blogGrid) return;

    // Renderização dos posts
    function renderPosts(filter = 'all') {
        blogGrid.innerHTML = '';
        
        const filteredPosts = filter === 'all' 
            ? BLOG_POSTS_DATA 
            : BLOG_POSTS_DATA.filter(post => post.category.toLowerCase() === filter.toLowerCase());

        if (filteredPosts.length === 0) {
            blogGrid.innerHTML = `<p class="no-posts-text">Nenhum artigo encontrado para esta categoria.</p>`;
            return;
        }

        filteredPosts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-cover">
                    <i class="${post.iconClass}"></i>
                </div>
                <div class="blog-body">
                    <div class="blog-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                        <span><i class="fa-solid fa-tag"></i> ${post.category}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-footer-actions">
                        <button class="btn btn-secondary btn-read" data-id="${post.id}">Ler Artigo Completo</button>
                        <a href="${post.instagramUrl}" target="_blank" class="instagram-post-link" aria-label="Ver no Instagram">
                            <i class="fa-brands fa-instagram"></i> Ver Post
                        </a>
                    </div>
                </div>
            `;
            blogGrid.appendChild(card);
        });

        // Adiciona listeners para os botões "Ler Artigo Completo"
        const readButtons = blogGrid.querySelectorAll('.btn-read');
        readButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('data-id');
                openArticleInModal(postId);
            });
        });
    }

    // Inicializa a renderização com "Todos"
    renderPosts('all');

    // Filtros de Categoria
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            renderPosts(filter);
        });
    });

    // Função para abrir o artigo no Modal
    function openArticleInModal(id) {
        const post = BLOG_POSTS_DATA.find(p => p.id === id);
        if (!post || !blogModal || !modalContentContainer) return;

        modalContentContainer.innerHTML = `
            <div class="modal-article-header">
                <span class="modal-article-tag"><i class="fa-solid fa-tag"></i> ${post.category}</span>
                <span class="modal-article-date"><i class="fa-regular fa-calendar"></i> Publicado em ${post.date}</span>
                <h2>${post.title}</h2>
                <div class="modal-author-bar">
                    <div class="author-avatar"><i class="fa-solid fa-user-tie"></i></div>
                    <div>
                        <strong>Dra. Heloisa Pierini</strong>
                        <span>Advogada Especialista em Aviação • OAB/SC 56.466</span>
                    </div>
                </div>
            </div>
            <div class="modal-article-body">
                ${post.contentHtml}
            </div>
            <div class="modal-article-footer">
                <p>Este artigo foi originalmente resumido e publicado como uma dica interativa no Instagram.</p>
                <div class="modal-article-actions">
                    <a href="${post.instagramUrl}" target="_blank" class="btn btn-primary">
                        <i class="fa-brands fa-instagram"></i> Ver publicação no Instagram
                    </a>
                    <a href="#agendamento" class="btn btn-secondary btn-close-n-schedule">
                        <i class="fa-solid fa-calendar-check"></i> Agendar Análise de Caso
                    </a>
                </div>
            </div>
        `;

        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem da página principal

        // Configura o CTA interno do modal para fechar e ir para o agendamento
        const modalScheduleBtn = modalContentContainer.querySelector('.btn-close-n-schedule');
        if (modalScheduleBtn) {
            modalScheduleBtn.addEventListener('click', () => {
                closeModal();
            });
        }
    }

    // Função de fechamento
    function closeModal() {
        blogModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBlogModal) {
        closeBlogModal.addEventListener('click', closeModal);
    }

    if (blogModal) {
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                closeModal();
            }
        });
    }
}

/**
 * 3. PORTAL DO CLIENTE SIMULADO COM LOGIN E DASHBOARD DE PROCESSOS
 */
function initClientPortal() {
    const loginForm = document.getElementById('portal-login-form');
    const usernameInput = document.getElementById('portal-username');
    const passwordInput = document.getElementById('portal-password');
    const errorMsg = document.getElementById('login-error-msg');
    
    const loginPanel = document.getElementById('portal-login-panel');
    const dashboardPanel = document.getElementById('portal-dashboard-panel');
    const clientNameSpan = document.getElementById('client-name');
    const processesList = document.getElementById('processes-list');
    const logoutBtn = document.getElementById('btn-logout');

    const MOCK_USER = {
        email: "cliente@teste.com",
        password: "123456",
        name: "Luís Augusto de Oliveira",
        code: "HP-2980-SC",
        processes: [
            {
                airline: "GOL Linhas Aéreas",
                processNumber: "5012345-67.2026.8.24.0020",
                type: "Indenização por Extravio de Bagagem e Danos Emergenciais",
                statusText: "Proposta de Acordo",
                statusClass: "status-warning",
                statusDesc: "A companhia aérea ofereceu acordo de R$ 7.200,00. Nossa equipe jurídica já deu parecer favorável e estamos aguardando sua assinatura digital e a posterior homologação pelo Juízo.",
                lastUpdate: "26 Mai 2026",
                icon: "fa-solid fa-suitcase-rolling"
            },
            {
                airline: "LATAM Airlines Brasil",
                processNumber: "5029874-12.2026.8.24.0020",
                type: "Indenização por Cancelamento de Voo e No-Show Abusivo",
                statusText: "Sentença Procedente",
                statusClass: "status-success",
                statusDesc: "Vitória judicial! O Juiz de Direito da Vara Cível julgou procedentes os pedidos e condenou a LATAM a pagar R$ 9.500,00 corrigidos monetariamente. O processo está em fase de expedição de alvará de pagamento.",
                lastUpdate: "28 Mai 2026",
                icon: "fa-solid fa-plane-slash"
            }
        ]
    };

    if (!loginForm) return;

    // Processa Submissão do Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === MOCK_USER.email && password === MOCK_USER.password) {
            // Login com sucesso
            errorMsg.style.display = 'none';
            loginForm.reset();
            
            loadDashboard();
        } else {
            // Falha de credenciais
            errorMsg.style.display = 'block';
            errorMsg.classList.add('shake-anim');
            setTimeout(() => {
                errorMsg.classList.remove('shake-anim');
            }, 500);
        }
    });

    // Carrega o Dashboard
    function loadDashboard() {
        if (!loginPanel || !dashboardPanel || !clientNameSpan || !processesList) return;

        clientNameSpan.textContent = MOCK_USER.name;
        processesList.innerHTML = '';

        MOCK_USER.processes.forEach(proc => {
            const card = document.createElement('div');
            card.className = 'process-card';
            card.innerHTML = `
                <div class="process-card-header">
                    <div class="process-airline">
                        <i class="${proc.icon} process-icon"></i>
                        <div>
                            <h5>${proc.airline}</h5>
                            <span class="process-num">Nº ${proc.processNumber}</span>
                        </div>
                    </div>
                    <span class="status-badge ${proc.statusClass}">${proc.statusText}</span>
                </div>
                <div class="process-card-body">
                    <span class="process-type-label">Objeto da Ação:</span>
                    <p class="process-type">${proc.type}</p>
                    <p class="process-desc">${proc.statusDesc}</p>
                </div>
                <div class="process-card-footer">
                    <span><i class="fa-regular fa-clock"></i> Última Atualização: <strong>${proc.lastUpdate}</strong></span>
                    <span class="process-update-badge"><i class="fa-solid fa-circle"></i> Atualizado</span>
                </div>
            `;
            processesList.appendChild(card);
        });

        // Alterna os painéis
        loginPanel.classList.add('hidden');
        dashboardPanel.classList.remove('hidden');

        // Salva estado de login na sessão
        sessionStorage.setItem('isLoggedIn', 'true');
    }

    // Processa Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            dashboardPanel.classList.add('hidden');
            loginPanel.classList.remove('hidden');
            sessionStorage.removeItem('isLoggedIn');
        });
    }

    // Verifica se já está logado na sessão ao carregar a página
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loadDashboard();
    }
}

/**
 * 4. AGENDA INTEGRADA DE AGENDAMENTOS ONLINE PASSO A PASSO
 */
function initBookingAgenda() {
    const bookingForm = document.getElementById('booking-form');
    const bookingDateInput = document.getElementById('booking-date');
    const timeSlotsGrid = document.getElementById('time-slots-grid');
    const btnNextStep = document.getElementById('btn-next-step');
    const btnPrevStep = document.getElementById('btn-prev-step');
    
    const stepSlot = document.getElementById('step-slot');
    const stepDetails = document.getElementById('step-details');
    const successBox = document.getElementById('booking-success-box');
    
    const summaryDatetime = document.getElementById('summary-datetime');
    const bookedDetailsName = document.getElementById('booked-details-name');
    const bookedDetailsTime = document.getElementById('booked-details-time');
    const btnResetBooking = document.getElementById('btn-reset-booking');

    let selectedDate = '';
    let selectedTime = '';

    // Mock slots disponíveis para qualquer dia
    const MOCK_HOURS = ["09:00", "10:30", "14:00", "15:30", "17:00"];

    if (!bookingForm || !bookingDateInput) return;

    // Configura a data mínima como Hoje para evitar agendamento retroativo
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    bookingDateInput.min = formattedToday;

    // Escuta mudança de Data
    bookingDateInput.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        selectedTime = '';
        btnNextStep.disabled = true;

        if (selectedDate) {
            generateTimeSlots();
        } else {
            timeSlotsGrid.innerHTML = '';
        }
    });

    // Gera botões de slots horários
    function generateTimeSlots() {
        timeSlotsGrid.innerHTML = '';
        
        MOCK_HOURS.forEach(time => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'time-slot-btn';
            btn.textContent = time;
            
            btn.addEventListener('click', () => {
                // Desmarca outros botões
                timeSlotsGrid.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                
                // Marca o atual
                btn.classList.add('selected');
                selectedTime = time;
                
                // Habilita avançar
                btnNextStep.disabled = false;
            });
            
            timeSlotsGrid.appendChild(btn);
        });
    }

    // Avançar para passo de Detalhes
    btnNextStep.addEventListener('click', () => {
        if (!selectedDate || !selectedTime) return;

        // Formata data brasileira legível
        const dateObj = new Date(selectedDate + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });

        // Capitaliza a primeira letra do dia da semana
        const readableDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        summaryDatetime.innerHTML = `
            <i class="fa-regular fa-calendar-check"></i> ${readableDate}<br>
            <i class="fa-regular fa-clock"></i> Horário selecionado: <strong>${selectedTime}</strong>
        `;

        stepSlot.classList.add('hidden');
        stepDetails.classList.remove('hidden');
    });

    // Voltar para passo de Data/Horário
    btnPrevStep.addEventListener('click', () => {
        stepDetails.classList.add('hidden');
        stepSlot.classList.remove('hidden');
    });

    // Submissão final do Agendamento
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const custName = document.getElementById('cust-name').value.trim();
        const custPhone = document.getElementById('cust-phone').value.trim();
        const custIncident = document.getElementById('cust-incident').value;

        // Formata dados de confirmação
        bookedDetailsName.innerHTML = `<i class="fa-regular fa-user"></i> Cliente: <strong>${custName}</strong>`;
        
        const dateObj = new Date(selectedDate + 'T00:00:00');
        const readableDate = dateObj.toLocaleDateString('pt-BR');
        bookedDetailsTime.innerHTML = `<i class="fa-regular fa-calendar"></i> Dia ${readableDate} às <strong>${selectedTime}h</strong> (WhatsApp: ${custPhone})`;

        // Oculta passos e exibe painel de sucesso
        stepDetails.classList.add('hidden');
        bookingForm.classList.add('hidden');
        successBox.classList.remove('hidden');
    });

    // Reiniciar fluxo de agendamento
    if (btnResetBooking) {
        btnResetBooking.addEventListener('click', () => {
            bookingForm.reset();
            selectedDate = '';
            selectedTime = '';
            timeSlotsGrid.innerHTML = '';
            btnNextStep.disabled = true;
            
            successBox.classList.add('hidden');
            bookingForm.classList.remove('hidden');
            stepSlot.classList.remove('hidden');
        });
    }
}
