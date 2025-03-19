let participantes = [
  {
    nome: "Reinaldo Junior",
    email: "reinaldojunior@gmail.com",
    dataIncricao: new Date(2025, 3, 19, 12, 40),
    dataCheckIn: new Date(2025, 4, 20, 12, 0),
  },
  {
    nome: "Paulo Gomes",
    email: "paulogomes@gmail.com",
    dataIncricao: new Date(2025, 3, 30, 12, 40),
    dataCheckIn: new Date(2025, 4, 21, 12, 0),
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    dataIncricao: new Date(2025, 3, 22, 9, 0),
    dataCheckIn: null,
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@gmail.com",
    dataIncricao: new Date(2025, 3, 18, 15, 30),
    dataCheckIn: new Date(2025, 4, 19, 11, 45),
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@gmail.com",
    dataIncricao: new Date(2025, 3, 25, 14, 10),
    dataCheckIn: null,
  },
  {
    nome: "Ricardo Martins",
    email: "ricardo.martins@gmail.com",
    dataIncricao: new Date(2025, 3, 15, 8, 30),
    dataCheckIn: new Date(2025, 4, 16, 9, 30),
  },
  {
    nome: "Mariana Souza",
    email: "mariana.souza@gmail.com",
    dataIncricao: new Date(2025, 3, 28, 17, 25),
    dataCheckIn: new Date(2025, 4, 29, 14, 0),
  },
  {
    nome: "Lucas Pereira",
    email: "lucas.pereira@gmail.com",
    dataIncricao: new Date(2025, 3, 21, 10, 0),
    dataCheckIn: null,
  },
  {
    nome: "Juliana Almeida",
    email: "juliana.almeida@gmail.com",
    dataIncricao: new Date(2025, 3, 12, 16, 50),
    dataCheckIn: new Date(2025, 4, 13, 11, 0),
  },
  {
    nome: "Eduardo Lima",
    email: "eduardo.lima@gmail.com",
    dataIncricao: new Date(2025, 3, 17, 13, 30),
    dataCheckIn: new Date(2025, 4, 18, 10, 45),
  },
];
const criarParticipante = (participante) => {
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);
  let dataIncricao = dayjs(Date.now()).to(participante.dataIncricao);

  if (participante.dataCheckIn === null) {
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick="checkIn(event)">
    Realizar Check-in
    </button>
    `;
  }
  return `
  <tr>
          <td>
            <strong>${participante.nome}</strong> <br />
            <small>${participante.email}</small>
          </td>
          <td>${dataIncricao}</td>
          <td>${dataCheckIn}</td>
        </tr>
  `;
};

const atualizarLista = (participantes) => {
  output = "";
  for (participante of participantes) {
    output = output + criarParticipante(participante);
  }
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataIncricao: new Date(),
    dataCheckIn: null,
  };

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  });

  if (participanteExiste) {
    alert("Participante já cadastrado");
    return;
  }

  participantes = [participante, ...participantes];

  atualizarLista(participantes);

  event.target.querySelector(' input[name="nome"]').value = "";
  event.target.querySelector(' input[name="email"]').value = "";
};
const checkIn = (event) => {
  const mensagemConfirma = "Deseja confirmar o check-in?";
  if (confirm(mensagemConfirma) == false) {
    return;
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  participante.dataCheckIn = new Date();
  atualizarLista(participantes);
};
