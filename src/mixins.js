var mixin = {
  methods: {
    cnpj(v) {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/^(\d{2})(\d)/, "$1.$2"); //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2"); //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca um hífen depois do bloco de quatro dígitos
      return v;
    },
    cpf(v) {
      v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
      return v;
    },
    documentMask(v) {
      if (v.length == 11) {
        return this.cpf(v);
      } else {
        return this.cnpj(v);
      }
    },
    remove(arr, cb) {
      const newArr = [];

      arr.forEach((item) => {
        if (!cb(item)) {
          newArr.push(item);
        }
      });

      return newArr;
    },
    companyType(v) {
      switch (v) {
        case "pf":
          return "Pessoa Física";
        case "me":
          return "Micro Empresa";
        case "mei":
          return "Microempreendedor Individual";
        case "eireli":
          return "Empresa Individual de Responsabilidade Limitada";
        case "slu":
          return "Sociedade Limitada Unipessoal";
        case "ss":
          return "Sociedade Simples";
        case "sa":
          return "Sociedade Anônima";
        case "ltda":
          return "Sociedade Limitada";
        default:
          return "Inválido";
      }
    },
  },
};

export { mixin };
