// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-item').forEach(item => {
    observer.observe(item);
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Duração da animação em ms
    once: true, // Apenas anima uma vez
    offset: 100 // Distância de onde a animação deve começar
});

// Inicializa Swiper para o carrossel do Instagram
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.instagram-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
        },
    });

    // --- Lógica do Menu Mobile (Hamburguer) ---
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link'); // Seleciona todos os links dentro do menu mobile

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('mobile-menu-open');
        mobileMenu.classList.toggle('mobile-menu-closed');
        // Opcional: Adicionar/remover uma classe para o corpo para evitar scroll quando o menu estiver aberto
        document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('mobile-menu-open'));
    }

    // Event listener para o botão do menu hambúrguer
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Event listeners para fechar o menu mobile ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu(); // Fecha o menu
            }
        });
    });

    // Smooth scrolling for anchor links (adjusted for fixed header and mobile menu interaction)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Verifica se o link NÃO é para abrir as modais "Sobre" ou "Pacotes"
        if (anchor.id !== 'open-about-modal' && anchor.id !== 'open-about-modal-mobile' &&
            anchor.id !== 'open-packages-modal' && anchor.id !== 'open-packages-modal-mobile') {

            anchor.addEventListener('click', function(e) {
                e.preventDefault(); // Previne o comportamento padrão (pulo instantâneo)

                const href = this.getAttribute('href');

                if (href === '#home') { // Se o link for para a seção "home"
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const targetId = href.substring(1); // Remove o "#"
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const navbarHeight = document.getElementById('desktop-menu') ? document.getElementById('desktop-menu').offsetHeight : 80; // Ajuste dinâmico ou valor fixo
                        window.scrollTo({
                            top: targetElement.offsetTop - navbarHeight, // Ajuste para a altura do cabeçalho fixo
                            behavior: 'smooth'
                        });
                    }
                }
                // Fecha o menu mobile se estiver aberto
                if (mobileMenu.classList.contains('mobile-menu-open')) {
                    toggleMobileMenu();
                }
            });
        }
    });

    // --- Lógica do Modal Genérica (LightBox, Sobre, Pacotes) ---
    function openModal(modalElement) {
        if (mobileMenu.classList.contains('mobile-menu-open')) { // Se o menu mobile estiver aberto, feche-o primeiro
            toggleMobileMenu();
        }
        modalElement.classList.remove('hidden');
        document.body.classList.add('no-scroll'); // Previne scroll da página principal
        setTimeout(() => { // Pequeno delay para a transição
            modalElement.classList.remove('opacity-0', 'scale-95');
            modalElement.classList.add('opacity-100', 'scale-100');
        }, 10);
    }

    function closeModal(modalElement) {
        modalElement.classList.remove('opacity-100', 'scale-100');
        modalElement.classList.add('opacity-0', 'scale-95');
        setTimeout(() => { // Espera a transição terminar para ocultar completamente
            modalElement.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 300);
    }

    // LIGHTBOX DA GALERIA
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = lightbox.querySelector('.modal-close');

    document.querySelectorAll('.gallery-item img').forEach(item => {
        item.addEventListener('click', function() {
            lightboxImg.src = this.src;
            openModal(lightbox);
        });
    });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => closeModal(lightbox));
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeModal(lightbox);
            }
        });
    }

    // MODAL "SOBRE"
    const aboutModal = document.getElementById('about-modal');
    const openAboutModalBtn = document.getElementById('open-about-modal');
    const openAboutModalMobileBtn = document.getElementById('open-about-modal-mobile');
    const closeAboutModalBtn = document.getElementById('close-about-modal');

    if (openAboutModalBtn) {
        openAboutModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aboutModal);
        });
    }

    if (openAboutModalMobileBtn) {
        openAboutModalMobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aboutModal);
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();  // Garante que o menu mobile feche ao abrir o modal
            }
        });
    }

    if (closeAboutModalBtn) {
        closeAboutModalBtn.addEventListener('click', () => closeModal(aboutModal));
    }

    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                closeModal(aboutModal);
            }
        });
    }

    // MODAL "PACOTES"
    const packagesModal = document.getElementById('packages-modal');
    const openPackagesModalBtn = document.getElementById('open-packages-modal');
    const openPackagesModalMobileBtn = document.getElementById('open-packages-modal-mobile');
    const closePackagesModalBtn = document.getElementById('close-packages-modal');

    if (openPackagesModalBtn) {
        openPackagesModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(packagesModal);
        });
    }

    if (openPackagesModalMobileBtn) {
        openPackagesModalMobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(packagesModal);
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu(); // Garante que o menu mobile feche ao abrir o modal
            }
        });
    }

    if (closePackagesModalBtn) {
        closePackagesModalBtn.addEventListener('click', () => closeModal(packagesModal));
    }

    if (packagesModal) {
        packagesModal.addEventListener('click', (e) => {
            if (e.target === packagesModal) {
                closeModal(packagesModal);
            }
        });
    }

    // FORMULÁRIO DE SIMULAÇÃO E WHATSAPP
    const simulationForm = document.getElementById('simulation-form');
    const inputPessoas = document.getElementById('pessoas');
    const inputPacote = document.getElementById('pacote');
    // const estimatedPriceDisplay = document.getElementById('estimated-price'); // Este ID não existe mais no HTML atual para o display de preço
    const whatsappNumber = '5521994662628'; // Seu número de WhatsApp (incluindo DDI e DDD)

    // Dados de preços e observações
    const pricing = {
        'Basic': {
            'até 50 pessoas': { min: 425, max: 500, obs: 'Ideal para eventos íntimos.', included: '2 Barmans, bar montado simples, utensílios de bar, gelo, seleção de frutas frescas para Caipirinhas/Caipivodkas, açúcar e insumos básicos.', duration: '5 horas' },
            'até 100 pessoas': { min: 500, max: 575, obs: 'Perfeito para celebrações de médio porte.', included: '2 Barmans, bar montado simples, utensílios de bar, gelo, seleção de frutas frescas para Caipirinhas/Caipivodkas, açúcar e insumos básicos.', duration: '5 horas' },
            'até 150 pessoas': { min: 525, max: 600, obs: 'Otimizado para eventos com muitos convidados.', included: '2 Barmans, bar montado simples, utensílios de bar, gelo, seleção de frutas frescas para Caipirinhas/Caipivodkas, açúcar e insumos básicos.', duration: '5 horas' },
            'até 200 pessoas': { min: 575, max: 650, obs: 'Garante fluidez no atendimento de grandes festas.', included: '2 Barmans, bar montado simples, utensílios de bar, gelo, seleção de frutas frescas para Caipirinhas/Caipivodkas, açúcar e insumos básicos.', duration: '5 horas' },
            'mais de 200 pessoas': { min: 625, max: null, obs: 'Consulte-nos para um orçamento personalizado.', included: '2 Barmans, bar montado simples, utensílios de bar, gelo, seleção de frutas frescas para Caipirinhas/Caipivodkas, açúcar e insumos básicos.', duration: '5 horas' }
        },
        'Premium': {
            'até 50 pessoas': { min: 550, max: 625, obs: 'Uma experiência exclusiva para poucos.', included: '2-3 Barmans (dependendo do porte do evento), bar montado com design aprimorado, todos os utensílios, gelo cristalino, vasta gama de frutas frescas e guarnições especiais (para Gin Tônica e Aperol Spritz), xaropes artesanais, copos elegantes (de vidro ou descartáveis premium), canudos e guardanapos.', duration: '5 horas' },
            'até 100 pessoas': { min: 700, max: 800, obs: 'Perfeito para eventos que buscam sofisticação.', included: '2-3 Barmans (dependendo do porte do evento), bar montado com design aprimorado, todos os utensílios, gelo cristalino, vasta gama de frutas frescas e guarnições especiais (para Gin Tônica e Aperol Spritz), xaropes artesanais, copos elegantes (de vidro ou descartáveis premium), canudos e guardanapos.', duration: '5 horas' },
            'até 150 pessoas': { min: 750, max: 875, obs: 'Garante um bar impecável e atendimento ágil.', included: '2-3 Barmans (dependendo do porte do evento), bar montado com design aprimorado, todos os utensílios, gelo cristalino, vasta gama de frutas frescas e guarnições especiais (para Gin Tônica e Aperol Spritz), xaropes artesanais, copos elegantes (de vidro ou descartáveis premium), canudos e guardanapos.', duration: '5 horas' },
            'até 200 pessoas': { min: 850, max: 975, obs: 'Elevamos o nível de sua festa, sem preocupações.', included: '2-3 Barmans (dependendo do porte do evento), bar montado com design aprimorado, todos os utensílios, gelo cristalino, vasta gama de frutas frescas e guarnições especiais (para Gin Tônica e Aperol Spritz), xaropes artesanais, copos elegantes (de vidro ou descartáveis premium), canudos e guardanapos.', duration: '5 horas' },
            'mais de 200 pessoas': { min: 950, max: null, obs: 'Para eventos grandiosos, consulte-nos para um projeto único.', included: '2-3 Barmans (dependendo do porte do evento), bar montado com design aprimorado, todos os utensílios, gelo cristalino, vasta gama de frutas frescas e guarnições especiais (para Gin Tônica e Aperol Spritz), xaropes artesanais, copos elegantes (de vidro ou descartáveis premium), canudos e guardanapos.', duration: '5 horas' }
        }
    };


    // Evento de envio do formulário
    if (simulationForm) {
        simulationForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Previne o envio padrão do formulário

            // Coleta os dados do formulário
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            const pessoas = inputPessoas.value;
            const pacote = inputPacote.value;

            // Obtém o preço estimado, a observação, os serviços incluídos e a duração
            const selectedPricing = pricing[pacote] ? pricing[pacote][pessoas] : null;
            let priceInfo = 'Não foi possível estimar o preço. Por favor, entre em contato.';
            let priceObservation = '';
            let includedServices = '';
            let serviceDuration = '';


            if (selectedPricing) {
                if (selectedPricing.max === null) {
                    priceInfo = `Preço Estimado: A partir de R$ ${selectedPricing.min.toFixed(2).replace('.', ',')}`;
                } else {
                    priceInfo = `R$ ${selectedPricing.min.toFixed(2).replace('.', ',')} - R$ ${selectedPricing.max.toFixed(2).replace('.', ',')}`;
                }
                priceObservation = selectedPricing.obs;
                includedServices = selectedPricing.included;
                serviceDuration = selectedPricing.duration;
            }

            // Dados para o PDF e WhatsApp
            const simulationDetails = {
                nome,
                telefone,
                data,
                horario,
                pessoas,
                pacote,
                priceInfo,
                priceObservation,
                included: includedServices,
                duration: serviceDuration
            };

            // Pergunta ao usuário se deseja baixar o PDF ANTES de redirecionar
            const confirmDownload = confirm('Sua simulação está pronta. Deseja baixar um PDF com os detalhes?');

            if (confirmDownload) {
                // Importa jsPDF dinamicamente
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Cores do site
                const goldColor = '#FFD700'; // Dourado
                const textColor = '#0B0B0B'; // Preto rico (para o texto principal)
                const subTextColor = '#2a2a2a'; // Cinza elegante (para detalhes)

                // Adicionar logo
                const img = new Image();
                img.src = 'imagens/logo.png'; // Caminho correto para logo.png

                img.onload = () => {
                    doc.addImage(img, 'PNG', 85, 10, 40, 40); // Ajuste posição e tamanho conforme necessário (x, y, width, height)

                    let currentY = 60; // Começa o texto abaixo da logo

                    doc.setFontSize(24);
                    doc.setTextColor(goldColor);
                    doc.text('Simulação de Evento', 105, currentY, null, null, 'center');
                    currentY += 10;
                    doc.setFontSize(16);
                    doc.setTextColor(goldColor);
                    doc.text('RabuDiGalu Bar', 105, currentY, null, null, 'center');
                    currentY += 20;

                    // Linha divisória
                    doc.setDrawColor(goldColor);
                    doc.line(20, currentY, 190, currentY);
                    currentY += 10;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Dados do Contato:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Nome: ${simulationDetails.nome}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Telefone/WhatsApp: ${simulationDetails.telefone}`, 20, currentY);
                    currentY += 15;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Detalhes do Evento:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Data: ${simulationDetails.data}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Horário: ${simulationDetails.horario}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Número de Pessoas: ${simulationDetails.pessoas}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Pacote Escolhido: ${simulationDetails.pacote}`, 20, currentY);
                    currentY += 15;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Detalhes do Pacote:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Duração Padrão do Serviço: ${simulationDetails.duration}`, 20, currentY);
                    currentY += 7;

                    // Quebrar o texto de "Serviços Incluídos" em várias linhas
                    const splitIncluded = doc.splitTextToSize(`Serviços Incluídos: ${simulationDetails.included}`, 170); // 170mm de largura para o texto
                    doc.text(splitIncluded, 20, currentY);
                    currentY += (splitIncluded.length * 7) + 15; // Ajusta o yOffset para o próximo bloco

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Simulação de Preço:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(simulationDetails.priceInfo, 20, currentY);
                    currentY += 7;
                    doc.text(`Observação: ${simulationDetails.priceObservation}`, 20, currentY);
                    currentY += 20;

                    // Rodapé
                    doc.setDrawColor(goldColor);
                    doc.line(20, currentY, 190, currentY);
                    currentY += 10;
                    doc.setFontSize(10);
                    doc.setTextColor(subTextColor);
                    doc.text('Entre em contato conosco para mais detalhes e para confirmar sua reserva!', 105, currentY, null, null, 'center');
                    doc.text('rabudigalueventos@gmail.com | (21) 99466-2628', 105, currentY + 5, null, null, 'center');

                    doc.save(`simulacao_${simulationDetails.nome.replace(/\s/g, '_')}_${simulationDetails.data}.pdf`);
                };

                img.onerror = () => {
                    console.error("Erro ao carregar a imagem para o PDF. Gerando PDF sem logo.");
                    // Fallback: Gerar PDF sem a imagem se houver erro no carregamento
                    let currentY = 20;
                    doc.setFontSize(24);
                    doc.setTextColor(goldColor);
                    doc.text('Simulação de Evento', 105, currentY, null, null, 'center');
                    currentY += 10;
                    doc.setFontSize(16);
                    doc.setTextColor(goldColor);
                    doc.text('RabuDiGalu Bar', 105, currentY, null, null, 'center');
                    currentY += 20;

                    // Linha divisória
                    doc.setDrawColor(goldColor);
                    doc.line(20, currentY, 190, currentY);
                    currentY += 10;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Dados do Contato:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Nome: ${simulationDetails.nome}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Telefone/WhatsApp: ${simulationDetails.telefone}`, 20, currentY);
                    currentY += 15;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Detalhes do Evento:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Data: ${simulationDetails.data}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Horário: ${simulationDetails.horario}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Número de Pessoas: ${simulationDetails.pessoas}`, 20, currentY);
                    currentY += 7;
                    doc.text(`Pacote Escolhido: ${simulationDetails.pacote}`, 20, currentY);
                    currentY += 15;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Detalhes do Pacote:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(`Duração Padrão do Serviço: ${simulationDetails.duration}`, 20, currentY);
                    currentY += 7;

                    const splitIncluded = doc.splitTextToSize(`Serviços Incluídos: ${simulationDetails.included}`, 170);
                    doc.text(splitIncluded, 20, currentY);
                    currentY += (splitIncluded.length * 7) + 15;

                    doc.setFontSize(16);
                    doc.setTextColor(textColor);
                    doc.text('Simulação de Preço:', 20, currentY);
                    currentY += 8;
                    doc.setFontSize(12);
                    doc.setTextColor(subTextColor);
                    doc.text(simulationDetails.priceInfo, 20, currentY);
                    currentY += 7;
                    doc.text(`Observação: ${simulationDetails.priceObservation}`, 20, currentY);
                    currentY += 20;

                    doc.setDrawColor(goldColor);
                    doc.line(20, currentY, 190, currentY);
                    currentY += 10;
                    doc.setFontSize(10);
                    doc.setTextColor(subTextColor);
                    doc.text('Entre em contato conosco para mais detalhes e para confirmar sua reserva!', 105, currentY, null, null, 'center');
                    doc.text('rabudigalueventos@gmail.com | (21) 99466-2628', 105, currentY + 5, null, null, 'center');

                    doc.save(`simulacao_${simulationDetails.nome.replace(/\s/g, '_')}_${simulationDetails.data}.pdf`);
                };
            }

            // Pequeno delay para permitir o download antes de abrir o WhatsApp
            setTimeout(() => {
                // Monta a mensagem para o WhatsApp
                const whatsappMessage = `
Olá! Gostaria de uma simulação de evento para o RabuDiGalu com os seguintes detalhes:

*Dados do Contato:*
Nome: ${simulationDetails.nome}
Telefone/WhatsApp: ${simulationDetails.telefone}

*Detalhes do Evento:*
Data: ${simulationDetails.data}
Horário: ${simulationDetails.horario}
Número de Pessoas: ${simulationDetails.pessoas}
Pacote Escolhido: ${simulationDetails.pacote}

*Serviços Incluídos:*\n${simulationDetails.included}

*Duração Padrão do Serviço:*\n${simulationDetails.duration}

*Simulação de Preço:*\n${simulationDetails.priceInfo}
Observação: ${simulationDetails.priceObservation}

Por favor, entre em contato para mais detalhes e para confirmar a reserva.
`;
                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }, 500); // 0.5 segundo de delay


            // Limpar o formulário após o envio
            simulationForm.reset();
            // Garante que o display de preço estimado esteja escondido (se houvesse um)
            // if (estimatedPriceDisplay) {
            //     estimatedPriceDisplay.classList.add('hidden');
            // }
        });
    }
});