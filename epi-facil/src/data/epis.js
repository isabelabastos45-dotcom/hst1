export const epis = [
  {
    id: "capacete",
    nome: "Capacete de segurança",
    categoria: "Cabeça",
    icone: "⛑️",
    resumo: "Protege a cabeça contra riscos previstos no projeto do equipamento.",
    riscos: ["Impactos contra objetos", "Queda de objetos, quando o modelo for adequado"],
    uso: "Pode ser necessário em atividades de construção, manutenção e indústria, conforme a avaliação dos riscos.",
    cuidados: ["Inspecione casco, suspensão e componentes antes do uso.", "Ajuste conforme as instruções do fabricante.", "Limpe e armazene conforme as orientações do fabricante.", "Retire de uso se apresentar danos ou após ocorrência que comprometa sua proteção."],
    passos: ["Confira se o capacete é adequado ao risco e se possui identificação e CA aplicável.", "Inspecione o casco e a suspensão: procure rachaduras, deformações ou peças danificadas.", "Ajuste a suspensão para que fique estável e confortável, seguindo o manual.", "Use durante toda a atividade em que a avaliação de riscos exigir essa proteção.", "Após o uso, higienize e guarde em local adequado, conforme o fabricante."],
    alerta: "Não faça furos, pinturas, adaptações ou alterações sem autorização do fabricante."
  },
  {
    id: "oculos",
    nome: "Óculos de proteção",
    categoria: "Olhos e face",
    icone: "🥽",
    resumo: "Ajuda a proteger os olhos contra partículas, respingos ou outros riscos compatíveis com o modelo.",
    riscos: ["Partículas projetadas", "Respingos", "Radiação específica, quando o modelo for apropriado"],
    uso: "Pode ser indicado em atividades de corte, lixamento, laboratório, manutenção e manipulação de produtos.",
    cuidados: ["Verifique lentes, armação e encaixe antes do uso.", "Escolha lentes adequadas ao risco.", "Limpe com produto e método recomendados pelo fabricante.", "Substitua se houver riscos, trincas ou perda de visibilidade."],
    passos: ["Identifique o risco para selecionar o tipo correto de óculos.", "Verifique se lentes e armação estão limpas e sem danos.", "Ajuste as hastes e o apoio para manter o equipamento estável.", "Use junto com outros EPIs compatíveis, se a atividade exigir.", "Guarde em estojo ou local protegido após a limpeza."],
    alerta: "Óculos comuns não substituem óculos de segurança. O modelo deve ser compatível com o risco."
  },
  {
    id: "protetor-auditivo",
    nome: "Protetor auditivo",
    categoria: "Audição",
    icone: "🎧",
    resumo: "Ajuda a reduzir a exposição ao ruído quando selecionado e utilizado corretamente.",
    riscos: ["Exposição ocupacional a ruído"],
    uso: "Pode ser necessário em ambientes com níveis de ruído prejudiciais, conforme avaliação ocupacional.",
    cuidados: ["Verifique integridade e limpeza.", "Siga as instruções de colocação e ajuste.", "Não compartilhe itens de uso individual sem higienização apropriada e orientação.", "Substitua peças danificadas ou que não mantenham vedação adequada."],
    passos: ["Confirme o tipo de protetor indicado para o nível e as características do ruído.", "Lave as mãos antes de manusear protetores de inserção reutilizáveis.", "Coloque ou ajuste conforme as instruções do fabricante.", "Verifique se está bem posicionado e mantenha o uso durante a exposição.", "Higienize e armazene de acordo com o manual."],
    alerta: "Protetores diferentes oferecem níveis de atenuação diferentes. A seleção deve considerar a avaliação do ambiente."
  },
  {
    id: "respirador",
    nome: "Respirador",
    categoria: "Respiratória",
    icone: "😷",
    resumo: "Protege as vias respiratórias contra contaminantes específicos quando selecionado corretamente.",
    riscos: ["Poeiras", "Névoas", "Fumos", "Vapores ou gases, conforme o filtro e o modelo"],
    uso: "Pode ser indicado em atividades com contaminantes no ar, após avaliação técnica e seleção do respirador adequado.",
    cuidados: ["Confira modelo, filtro, validade e integridade.", "Faça os testes de vedação previstos nas orientações aplicáveis.", "Mantenha barba ou objetos fora da área de vedação quando isso comprometer o ajuste.", "Armazene protegido de contaminação e danos."],
    passos: ["A seleção deve considerar o contaminante, concentração, tarefa e condições de uso.", "Inspecione peça facial, tirantes, válvulas e filtros.", "Coloque o respirador conforme as instruções do fabricante.", "Realize a verificação de vedação indicada para o modelo.", "Retire, higienize e armazene conforme o programa de proteção respiratória e o fabricante."],
    alerta: "Um respirador inadequado pode não proteger. A escolha e o uso exigem avaliação e orientação qualificadas."
  },
  {
    id: "luvas",
    nome: "Luvas de proteção",
    categoria: "Mãos",
    icone: "🧤",
    resumo: "Protegem as mãos contra riscos compatíveis com o material e o modelo da luva.",
    riscos: ["Cortes e abrasão", "Calor ou frio", "Agentes químicos ou biológicos, conforme o material"],
    uso: "A escolha depende da tarefa e do risco: uma luva adequada para um perigo pode ser inadequada para outro.",
    cuidados: ["Confira furos, rasgos, desgaste e contaminação.", "Verifique compatibilidade química quando aplicável.", "Higienize ou descarte conforme o tipo e as instruções.", "Não reutilize luvas descartáveis."],
    passos: ["Identifique o risco e selecione o material e tamanho adequados.", "Retire anéis e objetos que possam danificar a luva, quando indicado.", "Inspecione as luvas antes de vestir.", "Vista sem comprometer a integridade e use durante a tarefa prevista.", "Retire sem tocar desnecessariamente na superfície contaminada e siga o procedimento de descarte ou higienização."],
    alerta: "Nem toda luva protege contra produtos químicos, perfurações ou calor. Confira a especificação do fabricante."
  },
  {
    id: "calcado",
    nome: "Calçado de segurança",
    categoria: "Pés",
    icone: "🥾",
    resumo: "Ajuda a proteger os pés contra riscos definidos para o modelo.",
    riscos: ["Impactos e compressão", "Perfuração", "Escorregamento ou contato com agentes específicos, conforme o calçado"],
    uso: "Pode ser necessário em obras, estoques, indústrias, cozinhas e outras atividades.",
    cuidados: ["Confira solado, cabedal, biqueira e fechamento.", "Mantenha limpo e seco conforme orientação do fabricante.", "Verifique sinais de desgaste ou danos.", "Substitua quando perder características de proteção."],
    passos: ["Escolha o calçado de acordo com o risco e as condições do piso.", "Confira numeração e ajuste adequado.", "Inspecione solado e estrutura antes de usar.", "Mantenha o fechamento ajustado durante a atividade.", "Limpe e armazene em local ventilado, conforme o fabricante."],
    alerta: "Calçado comum ou apenas antiderrapante não é automaticamente um calçado de segurança."
  },
  {
    id: "protetor-facial",
    nome: "Protetor facial",
    categoria: "Olhos e face",
    icone: "🛡️",
    resumo: "Ajuda a proteger a face contra respingos e partículas, conforme o modelo.",
    riscos: ["Respingos", "Partículas projetadas", "Calor ou radiação específica, quando previsto no equipamento"],
    uso: "Pode ser usado em atividades de laboratório, manutenção e processos industriais.",
    cuidados: ["Inspecione visor, suporte e fixadores.", "Mantenha o visor limpo e sem distorções.", "Use proteção ocular complementar quando necessário.", "Guarde protegido contra riscos e deformações."],
    passos: ["Confirme se o visor é adequado ao risco da tarefa.", "Verifique se há trincas, manchas ou distorções.", "Ajuste o suporte para manter o visor estável.", "Use conforme a orientação de segurança da atividade.", "Limpe e armazene após o uso."],
    alerta: "O protetor facial pode precisar ser combinado com óculos de segurança. Ele não substitui automaticamente outros EPIs."
  },
  {
    id: "avental",
    nome: "Avental de proteção",
    categoria: "Corpo",
    icone: "🥼",
    resumo: "Ajuda a proteger o tronco e outras áreas cobertas contra riscos compatíveis com o material.",
    riscos: ["Respingos", "Sujidade", "Calor ou agentes químicos específicos, conforme o modelo"],
    uso: "Pode ser utilizado em cozinhas, laboratórios, serviços de limpeza e processos industriais.",
    cuidados: ["Confira costuras, fechos e integridade do material.", "Higienize conforme o tipo de contaminação e o fabricante.", "Não use avental danificado ou incompatível com o produto manipulado.", "Armazene separado de roupas limpas quando houver contaminação."],
    passos: ["Identifique o risco para escolher o material apropriado.", "Inspecione o avental antes de vestir.", "Vista e feche conforme as instruções.", "Evite tocar superfícies limpas com a parte externa contaminada.", "Retire e higienize ou descarte conforme o procedimento do local."],
    alerta: "Aventais de tecido, impermeáveis e resistentes a produtos químicos têm finalidades diferentes."
  }
];

export const categorias = ["Todas", ...new Set(epis.map((epi) => epi.categoria))];

export const profissoes = [
  {
    nome: "Construção civil",
    emoji: "🏗️",
    descricao: "Obras, reformas, manutenção e atividades em canteiros.",
    equipamentos: ["Capacete de segurança", "Óculos de proteção", "Calçado de segurança", "Luvas de proteção", "Protetor auditivo", "Proteção contra quedas quando aplicável"],
    observacao: "A seleção depende da função, das etapas da obra e dos riscos identificados. Trabalho em altura exige medidas de prevenção específicas."
  },
  {
    nome: "Saúde",
    emoji: "🏥",
    descricao: "Atendimento, procedimentos e contato com pacientes ou materiais.",
    equipamentos: ["Luvas apropriadas", "Máscara ou respirador indicado", "Óculos de proteção", "Protetor facial", "Avental ou capote"],
    observacao: "O conjunto depende do procedimento, da avaliação do risco biológico e dos protocolos do serviço."
  },
  {
    nome: "Cozinha e alimentação",
    emoji: "🍳",
    descricao: "Preparo de alimentos, higienização e operação de cozinhas.",
    equipamentos: ["Calçado adequado e antiderrapante", "Luvas específicas para a tarefa", "Avental de proteção", "Proteção térmica quando necessária"],
    observacao: "Toucas e uniformes podem ser itens de higiene ou vestimenta de trabalho, não necessariamente EPIs. A necessidade depende do risco."
  },
  {
    nome: "Indústria",
    emoji: "🏭",
    descricao: "Operação de máquinas, produção, manutenção e movimentação.",
    equipamentos: ["Capacete de segurança", "Óculos de proteção", "Protetor auditivo", "Luvas adequadas", "Calçado de segurança", "Respirador quando indicado"],
    observacao: "Não existe um kit universal. Cada setor e operação precisa de avaliação específica."
  },
  {
    nome: "Limpeza e conservação",
    emoji: "🧹",
    descricao: "Limpeza de ambientes, coleta e uso de produtos de higienização.",
    equipamentos: ["Luvas compatíveis com os produtos", "Calçado adequado", "Óculos de proteção quando houver risco de respingos", "Avental apropriado", "Respirador quando indicado"],
    observacao: "Consulte os rótulos e fichas de segurança dos produtos e nunca misture produtos químicos."
  },
  {
    nome: "Laboratório",
    emoji: "🧪",
    descricao: "Manipulação de amostras, reagentes e materiais laboratoriais.",
    equipamentos: ["Óculos de proteção", "Luvas compatíveis", "Avental ou jaleco adequado", "Protetor facial quando necessário", "Respirador quando indicado"],
    observacao: "O EPI depende dos agentes manipulados, procedimentos e avaliação de risco do laboratório."
  }
];
