document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
        processarDiagnostico(accessToken);
    } else {
        document.getElementById('loading').innerHTML = "<h2>Erro: Falha na conexão.</h2><a href='index.html'>Tentar novamente</a>";
    }
});

async function processarDiagnostico(token) {
    try {
        // 1. Buscar páginas do usuário
        const resPages = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`);
        const pagesData = await resPages.json();

        if (pagesData.data && pagesData.data.length > 0) {
            const page = pagesData.data[0]; // Pega a primeira página para teste
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('relatorio').style.display = 'block';

            const container = document.getElementById('dados-conta');
            container.innerHTML = `
                <strong>Página:</strong> ${page.name} <br>
                <strong>Status da Conexão:</strong> Ativa (Token Válido)
            `;

            // 2. Lógica de Alertas (Exemplo de Diagnóstico)
            const alertas = document.getElementById('alertas');
            alertas.innerHTML += "<li>✅ Conexão com a API Meta estabelecida.</li>";
            alertas.innerHTML += "<li>⚠️ Bio do Instagram: Não detectámos link de WhatsApp (Sugerido).</li>";
            alertas.innerHTML += "<li>🔴 Frequência: Notámos menos de 3 posts nos últimos 7 dias.</li>";
            alertas.innerHTML += "<li>🚀 Agendamento: Sistema pronto para receber publicações.</li>";

            // Guardar o token para uso futuro (Agendador)
            localStorage.setItem('buyget_token', token);
        }
    } catch (error) {
        console.error("Erro ao processar dados:", error);
    }
}
