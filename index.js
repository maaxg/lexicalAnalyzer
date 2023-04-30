const inptData = document.getElementById("input-text");
const ruleContainer = document.getElementById("container");

const rules = [
  /*   {
    title: "Mais de 10 caracteres",
    regex: new RegExp(".{10,}"),
    status: false,
  }, */
  {
    title: "Apenas letras minúsculas",
    regex: new RegExp("^[^A-Z]*[a-z]+[^A-Z]*$"),
    status: false,
  },
  {
    title: "Apenas algarismos numéricos de 0 a 9",
    regex: new RegExp("^[0-9]|[1-9][0-9]$"),
    status: false,
  },
  {
    title:
      "Excetuando as letras x, y, z, t e w em cadeias de strings não serão válidas",
    regex: new RegExp("^(?:(?!xyztw)[^a-zA-Z\\d]*[a-zA-Z\\d]*)*$"),
    status: false,
  },
  {
    title: "Strings de palavras iniciadas com números são palavras reservadas",
    regex: new RegExp("^(?![0-9])[a-z0-9XYZTW@#_!()\\/*\\+\\-{}fL1]+$"),
    status: false,
  },
  {
    title: "Os espaços não poderão ser aceitos",
    regex: new RegExp("^[^\\s]+$"),
    status: false,
  },
  {
    title:
      "Tokens atômicos compostos pelas letras x, y, z, t e w poderão ser aceitas caso elas venham alternadas de operadores matemáticos +, -, * ou / e dos caracteres especiais (), L1, f, }, @, #, ! e de algarismos numéricos (caracterização de uma expressão matemática). Caso contrario não",
    regex: new RegExp(
      "^(?=.*[+\\-*/()L1f@#!\\d])[a-zA-Z0-9+*\\-\\/()L1f@#!{}XYTW]*[xyztw][a-zA-Z0-9+*\\-\\/()L1f@#!{}XYTW]*$"
    ),
    status: false,
  },
  {
    title: "Tamanho máximo de 10 tokens atômicos",
    regex: new RegExp("^(?:[^\\s]*\\s){0,9}[^\\s]*$"),
    status: false,
  },
  {
    title: "Possui acentos",
    regex: new RegExp("^[záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$"),
    status: false,
  },
];

function updateRule(index, value) {
  rules[index] = value;
}

function checkString() {
  const firstTen = inptData.value.substring(0, 9);
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule.regex.test(firstTen)) {
      updateRule(i, { ...rule, status: true });
    } else {
      updateRule(i, { ...rule, status: false });
    }
  }
}

function updateElements() {
  const elements = rules.map((value) => {
    if (value.status) {
      return `
      <span style="color: green">
        - ${value.title} [ ✅ ]
      </span>`;
    }
    return `
    <span style="color: red">
      - ${value.title} [ ❌ ]
    </span>`;
  });

  ruleContainer.innerHTML = elements.join("");
}

function handleSubmit() {
  checkString();
  updateElements();
}
