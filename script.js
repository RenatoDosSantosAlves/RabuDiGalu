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

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for anchor links
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
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para a altura do cabeçalho fixo
                        behavior: 'smooth'
                    });
                }
            }
            // Fecha o menu mobile se estiver aberto
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    }
});


// LIGHTBOX / MODAL GENÉRICA
function openModal(modalElement) {
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita rolagem do body
}

function closeModal(modalElement) {
    modalElement.classList.remove('active');
    document.body.style.overflow = ''; // Restaura rolagem do body
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

closeLightboxBtn.addEventListener('click', function() {
    closeModal(lightbox);
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeModal(lightbox);
    }
});

// MODAL "SOBRE"
const aboutModal = document.getElementById('about-modal');
const openAboutModalBtn = document.getElementById('open-about-modal');
const openAboutModalMobileBtn = document.getElementById('open-about-modal-mobile');
const closeAboutModalBtn = document.getElementById('close-about-modal');

openAboutModalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(aboutModal);
});

openAboutModalMobileBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(aboutModal);
    document.getElementById('mobile-menu').classList.add('hidden');
});

closeAboutModalBtn.addEventListener('click', function() {
    closeModal(aboutModal);
});

aboutModal.addEventListener('click', function(e) {
    if (e.target === aboutModal) {
        closeModal(aboutModal);
    }
});

// MODAL "PACOTES"
const packagesModal = document.getElementById('packages-modal');
const openPackagesModalBtn = document.getElementById('open-packages-modal');
const openPackagesModalMobileBtn = document.getElementById('open-packages-modal-mobile');
const closePackagesModalBtn = document.getElementById('close-packages-modal');

openPackagesModalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(packagesModal);
});

openPackagesModalMobileBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(packagesModal);
    document.getElementById('mobile-menu').classList.add('hidden');
});

closePackagesModalBtn.addEventListener('click', function() {
    closeModal(packagesModal);
});

packagesModal.addEventListener('click', function(e) {
    if (e.target === packagesModal) {
        closeModal(packagesModal);
    }
});

// FORMULÁRIO DE SIMULAÇÃO E WHATSAPP
const form = document.querySelector('form');
const inputPessoas = document.getElementById('pessoas');
const inputPacote = document.getElementById('pacote');
const estimatedPriceDisplay = document.getElementById('estimated-price');
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

// Função para gerar o PDF da simulação
async function generateSimulationPdf(simulationData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cores do site
    const goldColor = '#FFD700'; // Dourado
    const textColor = '#0B0B0B'; // Preto rico (para o texto principal)
    const subTextColor = '#2a2a2a'; // Cinza elegante (para detalhes)

    // Adicionar logo
    const img = new Image();
    img.src = 'imagens/logo.png'; // Caminho direto para logo.png (AJUSTADO PARA A PASTA CORRETA)
    console.log("Tentando carregar a imagem da logo do PDF:", img.src); // Log para depuração

    img.onload = () => {
        console.log("Imagem da logo carregada com sucesso."); // Log para depuração
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
        doc.text(`Nome: ${simulationData.nome}`, 20, currentY);
        currentY += 7;
        doc.text(`Telefone/WhatsApp: ${simulationData.telefone}`, 20, currentY);
        currentY += 15;

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Detalhes do Evento:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(`Data: ${simulationData.data}`, 20, currentY);
        currentY += 7;
        doc.text(`Horário: ${simulationData.horario}`, 20, currentY);
        currentY += 7;
        doc.text(`Número de Pessoas: ${simulationData.pessoas}`, 20, currentY);
        currentY += 7;
        doc.text(`Pacote Escolhido: ${simulationData.pacote}`, 20, currentY);
        currentY += 15;

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Detalhes do Pacote:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(`Duração Padrão do Serviço: ${simulationData.duration}`, 20, currentY);
        currentY += 7;

        // Quebrar o texto de "Serviços Incluídos" em várias linhas
        const splitIncluded = doc.splitTextToSize(`Serviços Incluídos: ${simulationData.included}`, 170); // 170mm de largura para o texto
        doc.text(splitIncluded, 20, currentY);
        currentY += (splitIncluded.length * 7) + 15; // Ajusta o yOffset para o próximo bloco

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Simulação de Preço:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(simulationData.priceInfo, 20, currentY);
        currentY += 7;
        doc.text(`Observação: ${simulationData.priceObservation}`, 20, currentY);
        currentY += 20;

        // Rodapé
        doc.setDrawColor(goldColor);
        doc.line(20, currentY, 190, currentY);
        currentY += 10;
        doc.setFontSize(10);
        doc.setTextColor(subTextColor);
        doc.text('Entre em contato conosco para mais detalhes e para confirmar sua reserva!', 105, currentY, null, null, 'center');
        doc.text('rabudigalueventos@gmail.com | (21) 99466-2628', 105, currentY + 5, null, null, 'center');

        doc.save(`simulacao_${simulationData.nome.replace(/\s/g, '_')}_${simulationData.data}.pdf`);
        console.log("PDF gerado e tentativa de download."); // Log para depuração
    };

    img.onerror = () => {
        console.error("Erro ao carregar a imagem para o PDF. Gerando PDF sem logo."); // Log para depuração
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
        doc.text(`Nome: ${simulationData.nome}`, 20, currentY);
        currentY += 7;
        doc.text(`Telefone/WhatsApp: ${simulationData.telefone}`, 20, currentY);
        currentY += 15;

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Detalhes do Evento:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(`Data: ${simulationData.data}`, 20, currentY);
        currentY += 7;
        doc.text(`Horário: ${simulationData.horario}`, 20, currentY);
        currentY += 7;
        doc.text(`Número de Pessoas: ${simulationData.pessoas}`, 20, currentY);
        currentY += 7;
        doc.text(`Pacote Escolhido: ${simulationData.pacote}`, 20, currentY);
        currentY += 15;

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Detalhes do Pacote:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(`Duração Padrão do Serviço: ${simulationData.duration}`, 20, currentY);
        currentY += 7;

        const splitIncluded = doc.splitTextToSize(`Serviços Incluídos: ${simulationData.included}`, 170);
        doc.text(splitIncluded, 20, currentY);
        currentY += (splitIncluded.length * 7) + 15;

        doc.setFontSize(16);
        doc.setTextColor(textColor);
        doc.text('Simulação de Preço:', 20, currentY);
        currentY += 8;
        doc.setFontSize(12);
        doc.setTextColor(subTextColor);
        doc.text(simulationData.priceInfo, 20, currentY);
        currentY += 7;
        doc.text(`Observação: ${simulationData.priceObservation}`, 20, currentY);
        currentY += 20;

        doc.setDrawColor(goldColor);
        doc.line(20, currentY, 190, currentY);
        currentY += 10;
        doc.setFontSize(10);
        doc.setTextColor(subTextColor);
        doc.text('Entre em contato conosco para mais detalhes e para confirmar sua reserva!', 105, currentY, null, null, 'center');
        doc.text('rabudigalueventos@gmail.com | (21) 99466-2628', 105, currentY + 5, null, null, 'center');

        doc.save(`simulacao_${simulationData.nome.replace(/\s/g, '_')}_${simulationData.data}.pdf`);
        console.log("PDF gerado sem logo devido a erro de carregamento da imagem e tentativa de download."); // Log para depuração
    };
}


// Evento de envio do formulário
form.addEventListener('submit', function(e) {
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
        console.log("Usuário confirmou o download do PDF."); // Log para depuração
        generateSimulationPdf(simulationDetails);
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

*Serviços Incluídos:*
${simulationDetails.included}

*Duração Padrão do Serviço:*
${simulationDetails.duration}

*Simulação de Preço:*
${simulationDetails.priceInfo}
Observação: ${simulationDetails.priceObservation}

Por favor, entre em contato para mais detalhes e para confirmar a reserva.
`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            console.log("Abrindo WhatsApp após tentativa de download do PDF."); // Log para depuração
        }, 500); // 0.5 segundo de delay
    } else {
        console.log("Usuário optou por NÃO baixar o PDF."); // Log para depuração
        // Se não quiser baixar o PDF, apenas redireciona para o WhatsApp
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

*Serviços Incluídos:*
${simulationDetails.included}

*Duração Padrão do Serviço:*
${simulationDetails.duration}

*Simulação de Preço:*
${simulationDetails.priceInfo}
Observação: ${simulationDetails.priceObservation}

Por favor, entre em contato para mais detalhes e para confirmar a reserva.
`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        console.log("Abrindo WhatsApp sem download do PDF."); // Log para depuração
    }

    // Limpar o formulário após o envio
    form.reset();
    // Garante que o display de preço estimado esteja escondido
    estimatedPriceDisplay.classList.add('hidden');
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Swiper for Instagram Feed
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
});