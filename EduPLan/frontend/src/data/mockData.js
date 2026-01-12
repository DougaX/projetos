export const salasData = [
    {
        id: 1,
        nome: "Mini Auditorio",
        capacidade: 50,
        descricao: "Auditorio para palestras e apresentacoes",
        itens: [
            { id: 1, nome: "Projetor Epson", status: "disponivel" },
            { id: 2, nome: "Sistema de Som", status: "disponivel" }
        ]
    },
    {
        id: 2,
        nome: "Laboratorio de Informatica",
        capacidade: 30,
        descricao: "Laboratorio com 30 computadores",
        itens: [
            { id: 3, nome: "Computadores", status: "disponivel" },
            { id: 4, nome: "Ar Condicionado", status: "disponivel" }
        ]
    },
    {
        id: 3,
        nome: "Laboratorio de Ciencias",
        capacidade: 25,
        descricao: "Laboratorio para experimentos cientificos",
        itens: [
            { id: 5, nome: "Microscopios", status: "disponivel" },
            { id: 6, nome: "Vidrarias", status: "manutencao" }
        ]
    },
    {
        id: 4,
        nome: "Sala de Video",
        capacidade: 40,
        descricao: "Sala equipada com projetor e sistema de som",
        itens: [
            { id: 7, nome: "TV 65 polegadas", status: "disponivel" },
            { id: 8, nome: "DVD Player", status: "indisponivel" }
        ]
    },
    {
        id: 5,
        nome: "Biblioteca",
        capacidade: 60,
        descricao: "Espaco para estudos e pesquisas",
        itens: [
            { id: 9, nome: "Mesas de Estudo", status: "disponivel" }
        ]
    }
];

export const usuariosData = [
    {
        id: 1,
        nome: "Coordenador Teste",
        email: "coordenador@eduplan.com",
        tipo: "coordenador"
    },
    {
        id: 2,
        nome: "Professor Joao",
        email: "joao@eduplan.com",
        tipo: "professor"
    },
    {
        id: 3,
        nome: "Professora Maria",
        email: "maria@eduplan.com",
        tipo: "professor"
    }
];

export const agendamentosData = [
    {
        id: 1,
        data: "2026-01-20",
        hora_inicio: "08:00",
        hora_fim: "10:00",
        status: "pendente",
        motivo_solicitacao: "Aula pratica de laboratorio",
        user: { id: 2, nome: "Professor Joao" },
        sala: { id: 2, nome: "Laboratorio de Informatica" }
    },
    {
        id: 2,
        data: "2026-01-21",
        hora_inicio: "14:00",
        hora_fim: "16:00",
        status: "aprovado",
        motivo_solicitacao: "Apresentacao de trabalhos",
        user: { id: 3, nome: "Professora Maria" },
        sala: { id: 1, nome: "Mini Auditorio" }
    }
];