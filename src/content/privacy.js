// Privacy policy text (LGPD – Lei nº 13.709/2018), one entry per locale of
// next.config.js. Rendered by src/pages/privacy.js. Keep it in step with what the
// app really collects (sign-up form, NextAuth providers, Prisma models).

const CONTACT = "hvilelaeng@gmail.com";

const privacy = {
    "pt-BR": {
        title: "Política de Privacidade",
        updated: "Última atualização: 8 de novembro de 2026",
        intro: "Esta política explica como o Kanplan (kanplan.hvilela.com) trata os seus dados pessoais, de acordo com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).",
        back: "Voltar",
        sections: [
            {
                title: "Quem é o responsável",
                paragraphs: [`O Kanplan é mantido por Henrique Vilela (Vilela Labs), controlador dos dados tratados aqui. Para qualquer assunto sobre privacidade ou para exercer os seus direitos, escreva para ${CONTACT}.`],
            },
            {
                title: "Quais dados tratamos",
                items: [
                    "Cadastro com e-mail: nome de usuário, e-mail e senha. A senha é guardada apenas como hash (bcrypt), nunca em texto.",
                    "Entrada com Google ou GitHub: nome, e-mail, foto de perfil e identificador da conta, enviados por esses serviços. Nunca temos acesso à sua senha deles.",
                    "Conteúdo que você cria: projetos e tarefas (títulos, descrições e status).",
                    "Dados técnicos: cookies de sessão e registros de acesso do servidor (como endereço IP e navegador), mantidos pelo provedor de hospedagem.",
                ],
            },
            {
                title: "Para que usamos e com qual base legal",
                paragraphs: [
                    "Usamos esses dados apenas para criar e proteger a sua conta, manter a sua sessão e guardar e exibir os seus projetos. A base legal é a execução do serviço que você solicitou (art. 7º, V, da LGPD). Os registros técnicos servem à segurança e ao funcionamento do aplicativo (legítimo interesse, art. 7º, IX).",
                    "Não usamos os seus dados para publicidade, não os vendemos e não criamos perfis de comportamento.",
                ],
            },
            {
                title: "Cookies e armazenamento local",
                paragraphs: [
                    "Usamos somente cookies essenciais, sem os quais o login não funciona: sessão, proteção contra falsificação de requisições (CSRF) e endereço de retorno após o login. Não há cookies de análise, de publicidade ou de terceiros; por isso não é necessário pedir consentimento para cookies.",
                    "O navegador guarda localmente qual projeto você abriu por último, apenas por conveniência, e o idioma escolhido fica no endereço da página. As fontes do site são servidas pelo próprio Kanplan, sem chamadas a serviços externos.",
                ],
            },
            {
                title: "Com quem compartilhamos",
                paragraphs: [
                    "Somente com prestadores necessários para o aplicativo funcionar, que tratam os dados em nosso nome: Vercel (hospedagem), o provedor do banco de dados em nuvem e, se você os usar para entrar, Google e GitHub. Esses serviços podem armazenar dados fora do Brasil, com garantias de proteção previstas no art. 33 da LGPD. Os dados também podem ser compartilhados se a lei ou uma ordem judicial exigir.",
                ],
            },
            {
                title: "Por quanto tempo guardamos",
                paragraphs: ["Enquanto a sua conta existir. Se você pedir a exclusão, apagamos a conta, os projetos e as tarefas em até 15 dias, exceto o que a lei obrigar a manter."],
            },
            {
                title: "Seus direitos",
                paragraphs: [
                    `Você pode pedir, a qualquer momento e sem custo: confirmação de que tratamos os seus dados, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade, informação sobre com quem os compartilhamos, revogação do consentimento e a exclusão da conta (art. 18 da LGPD). Basta escrever para ${CONTACT} a partir do e-mail da sua conta. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
                ],
            },
            {
                title: "Segurança",
                paragraphs: ["O acesso é feito por HTTPS e exige login, as senhas são guardadas com hash e cada usuário vê apenas os próprios projetos. Se ocorrer um incidente de segurança que possa trazer risco a você, avisaremos você e a ANPD, como determina a lei."],
            },
            {
                title: "Alterações",
                paragraphs: ["Esta política pode ser atualizada. A data no topo indica sempre a versão em vigor."],
            },
        ],
    },
    "en-US": {
        title: "Privacy Policy",
        updated: "Last updated: November 8, 2026",
        intro: "This policy explains how Kanplan (kanplan.hvilela.com) handles your personal data, in line with Brazil's General Data Protection Law (LGPD – Law No. 13,709/2018).",
        back: "Back",
        sections: [
            {
                title: "Who is responsible",
                paragraphs: [`Kanplan is run by Henrique Vilela (Vilela Labs), the controller of the data processed here. For any privacy matter or to exercise your rights, write to ${CONTACT}.`],
            },
            {
                title: "What data we process",
                items: [
                    "E-mail sign-up: username, e-mail and password. The password is only stored as a hash (bcrypt), never as plain text.",
                    "Sign-in with Google or GitHub: name, e-mail, profile picture and account identifier, sent by those services. We never have access to your password there.",
                    "Content you create: projects and tasks (titles, descriptions and status).",
                    "Technical data: session cookies and server access logs (such as IP address and browser), kept by the hosting provider.",
                ],
            },
            {
                title: "Why we use it and on which legal basis",
                paragraphs: [
                    "We use this data only to create and protect your account, keep you signed in and store and show your projects. The legal basis is the performance of the service you asked for (LGPD art. 7, V). Technical logs serve the security and operation of the app (legitimate interest, art. 7, IX).",
                    "We do not use your data for advertising, do not sell it and do not build behavioural profiles.",
                ],
            },
            {
                title: "Cookies and local storage",
                paragraphs: [
                    "We only use essential cookies, without which sign-in does not work: session, cross-site request forgery (CSRF) protection and the return address after sign-in. There are no analytics, advertising or third-party cookies, so no cookie consent is needed.",
                    "Your browser stores which project you opened last, just for convenience, and the chosen language is part of the page address. The site's fonts are served by Kanplan itself, with no calls to external services.",
                ],
            },
            {
                title: "Who we share it with",
                paragraphs: [
                    "Only with providers needed to run the app, which process the data on our behalf: Vercel (hosting), the cloud database provider and, if you use them to sign in, Google and GitHub. These services may store data outside Brazil, with the safeguards of LGPD art. 33. Data may also be shared when required by law or court order.",
                ],
            },
            {
                title: "How long we keep it",
                paragraphs: ["For as long as your account exists. If you ask for deletion, we delete the account, projects and tasks within 15 days, except what the law requires us to keep."],
            },
            {
                title: "Your rights",
                paragraphs: [
                    `At any time and free of charge you can ask for: confirmation that we process your data, access, correction, anonymization, blocking or deletion of unnecessary data, portability, information about who we share it with, withdrawal of consent and deletion of your account (LGPD art. 18). Just write to ${CONTACT} from your account's e-mail. You can also file a complaint with Brazil's National Data Protection Authority (ANPD).`,
                ],
            },
            {
                title: "Security",
                paragraphs: ["Access is over HTTPS and requires sign-in, passwords are stored hashed and each user only sees their own projects. If a security incident could put you at risk, we will notify you and the ANPD as the law requires."],
            },
            {
                title: "Changes",
                paragraphs: ["This policy may be updated. The date at the top always shows the version in force."],
            },
        ],
    },
};

export default function getPrivacy(locale) {
    return privacy[locale] ?? privacy["en-US"];
}
