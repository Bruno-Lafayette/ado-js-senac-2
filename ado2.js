"use strict";

// EXERCÍCIO 0 - ANTES DE MAIS NADA, IMPLEMENTE ESTA FUNÇÃO.
/**
 * Função que retorna um Array contendo os nomes dos alunos que fizeram este exercício.
 * @return {string[]} Os nomes dos alunos que fizeram este exercício.
 */
function nomesDosAlunos() {
    return ["Lucas Cristiano Lopes", "Thiago Dias", "Bruno Lafayette"];
}

/**
 * Esta classe representa a nota de um aluno em alguma ADO junto com o peso dessa ADO na composição da nota.
 */
class Nota {
    #valor;
    #peso;

    /**
     * Construtor da classe Nota.
     * @param {number} valor O valor entre 0 a 10 da nota.
     * @param {number} peso O peso da nota, entre 0 a 10, na composição total da nota semestral.
     */
    constructor(valor, peso) {
        this.#verificar(valor, peso);
        this.#peso = peso;
        this.#valor = valor;
    }

    // EXERCÍCIO 1.
    /**
     * As notas tem que ter um peso entre 0 e 10 e um valor entre 0 e 10 também. E é importante que esses campos sejam
     * numéricos. Este é o método privado (note o #) que valida isso.
     *
     * Verifique se o peso e o valor são numéricos (especificamente se eles tem o tipo number).
     * Se não forem, lance uma exceção do tipo TypeError. A mensagem da exceção deve ser a seguinte:
     * "A nota e o peso devem ser numéricos."
     *
     * Sendo numéricos, verifique se ambos estão no intervalo entre 0 e 10. Se não estiverem, lance uma exceção do tipo
     * RangeError com a seguinte mensagem:
     * "A nota e o peso devem ser um número entre 0 e 10."
     *
     * Para verificar o tipo de cada parâmetro, use a função determinarTipo2 que está no arquivo utils.js.
     * Ela é quase a mesma função determinarTipo que havia no ADO1, mas ela foi melhorada para não considerar NaNs e
     * infinitos como números.
     *
     * @param {number} valor O valor entre 0 a 10 da nota.
     * @param {number} peso O peso da nota, entre 0 a 10, na composição total da nota semestral.
     */
    #verificar(valor, peso) {
        if (determinarTipo2(valor) !== 'number' || determinarTipo2(peso) !== 'number') {
            throw new TypeError("A nota e o peso devem ser numéricos.");
        }
        if ((valor < 0 || valor > 10) || (peso < 0 || peso > 10)) {
            throw new RangeError("A nota e o peso devem ser um número entre 0 e 10.");
        }
    }

    // EXERCÍCIO 2.
    // Crie os métodos getters necessários de todos os parâmetros recebidos no construtor aqui.
    get valor() {
        return this.#valor;
    }
    get peso() {
        return this.#peso;
    }
    // EXERCÍCIO 3.
    /**
     * Retorna o valor ponderado desta nota. Ou seja, a nota numa escala de 0 a peso.
     * @returns {number} O valor ponderado desta nota.
     */
    get notaPonderada() {
        const emponderada = this.#peso * this.#valor / 10;
        return emponderada;
    }

    // EXERCÍCIO 4.
    /**
     * Retorna a representação string deste objeto. A representação deve ser a seguinte:
     * "nota = 6, peso = 4"
     * Obviamente, os números vão variar de acordo com os valores de nota e peso.
     * @returns {String} A representação string deste objeto.
     */
    toString() {
        const valor = this.#valor;
        const peso = this.#peso;
        return `nota = ${valor}, peso = ${peso}`;
    }
}

/**
 * A classe AlunoMatricula representa os dados de um(a) aluno(a) matriculado(a) em alguma disciplina.
 * Nesta classe temos o nome do(a) aluno(a), o gênero dele(a) e o nome da disciplina, bem como as notas
 * dos seus ADOs.
 *
 * As notas corresponde a um array onde cada elemento é da classe Nota e a soma das ponderações é igual a 10.
 *
 * A presença é um inteiro entre 0 e 100 representando a porcentagem de comparecimento às aulas.
 */
class AlunoMatricula {

    // EXERCÍCIO 5.
    /**
     * Considerando a descrição da classe como dada acima, implemente o construtor dela.
     * Basta salvar todos os valores recebidos dentro do "this". O nome dos campos
     * deve ser igual ao nome dos parâmetros com um "#" antes. Declare os campos antes do construtor
     * com #campo1; #campo2; #campo3; ...
     *
     * Observação: Valide o tipo dos parâmetros. Os testes mais chatos chamam esta função com o tipo errado só pra ter
     * certeza de que vocês não deixam que instâncias desta classe sejam criados com porcaria. Lance TypeError se algum
     * dos parâmetros for do tipo errado. Coloque a mensagem que você preferir na exceção, pois ela poderá aparecer na
     * tela no exercício 11. Use a mensagem que preferir, pois o teste só valida se há alguma mensagem que não esteja
     * em branco, mas não verifica qual é essa mensagem exatamente.
     *
     * Para o parâmetro "ados", use o operador "instanceof" para testá-lo se é um array. Lembre-se de testar se todos
     * os seus elementos são instâncias da classe "Nota" dos exercícios 1 a 3. Para o resto, você pode usar o operador
     * typeof ou a função determinarTipo2.
     *
     * Se todos os parâmetros forem dos tipos certos, verifique ainda se os seus valores são aceitáveis:
     * - Se o peso das notas recebidas não somar 10, lance RangeError.
     * - Se a presença não estiver entre 0 e 100, lance RangeError.
     * - Se o gênero não for "M" ou "F", lance RangeError.
     * - Se o nome do(a) aluno(a) ou da disciplina for uma string em branco, lance RangeError.
     * Novamente, a exceção lançada pode ter qualquer mensagem de sua preferência, desde que haja alguma mensagem e ela
     * não esteja em branco.
     *
     * @param {String} nome O nome do(a) aluno(a). Nunca deve ser uma string em branco.
     * @param {String} genero "M" se for um aluno ou "F" se for uma aluna.
     * @param {String} disciplina O nome da disciplina. Nunca deve ser uma string em branco.
     * @param {Array<Nota>} ados Os ADOs feitos pelo(a) aluno(a).
     * @param {number} presenca A quantidade de presença que o(a) aluno(a) teve na aula.
     * @throw TypeError Se qualquer parâmetro for do tipo errado.
     * @throw RangeError Se o valor de qualquer parâmetro não for aceitável.
     */
    constructor(nome, genero, disciplina, ados, presenca) {
        if (typeof nome !== "string") {
            throw new TypeError("Informe o nome do(a) aluno(a) corretamente.");
        }

        if (nome.trim() === "" ) {
            throw new RangeError("Informe o nome do(a) aluno(a) corretamente.");
        }

        if (typeof genero !== "string") {
            throw new TypeError("Escolha o gênero do(a) aluno(a) corretamente.");
        }

        if (genero !== "M" && genero !== "F") {
            throw new RangeError("Escolha o gênero do(a) aluno(a) corretamente.");
        }

        if (typeof disciplina !== "string") {
            throw new TypeError("Informe o nome da disciplina corretamente.");
        }
        if (disciplina.trim() === "") {
            throw new RangeError("Informe o nome da disciplina corretamente.");
        }

        if (!Array.isArray(ados) || !ados.every((ado) => ado instanceof Nota)) {
            throw new TypeError("Informe os ADOs corretamente como um array de objetos da classe Nota.");
        }

        if (ados.length === 0 ) {
            throw new RangeError("Informe os ADOs corretamente como um array de objetos da classe Nota.");
        }


        const pesoTotal = ados.reduce((total, ado) => total + ado.peso, 0);
        if (pesoTotal !== 10) {
            throw new RangeError("O peso das notas deve somar 10.");
        }

        if (typeof presenca !== "number" || isNaN(presenca)) {
            throw new TypeError("Informe a presença corretamente como um número entre 0 e 100.");
        }

        if (presenca < 0 || presenca > 100 ) {
            throw new RangeError("Informe a presença corretamente como um número entre 0 e 100.");
        }

        this._nome = nome;
        this._genero = genero;
        this._disciplina = disciplina;
        this._ados = ados;
        this._presenca = presenca;
    }

    // EXERCÍCIO 6.
    // Crie os métodos getters necessários de todos os parâmetros recebidos no construtor aqui.
    get nome() {
        return this._nome;
    }

    get genero() {
        return this._genero;
    }

    get disciplina() {
        return this._disciplina;
    }

    get ados() {
        return this._ados;
    }

    get presenca() {
        return this._presenca;
    }

    // EXERCÍCIO 7.
    /**
     * Este método calcula a nota final do(a) aluno(a) na disciplina.
     * Ela é calculada simplesmente somando as notas ponderadas de todos os ADOs.
     *
     * @returns {number} A média final do(a) aluno(a) na disciplina.
     */
    get media() {
        if (this._ados.length === 0){
            return 0; 
        }
        let somaNotas = 0;
        for (let nota of this._ados) {
            somaNotas += nota.notaPonderada;
        }
        return somaNotas;
    }

    // EXERCÍCIO 8.
    /**
     * Este método deve retornar a situação do(a) aluno(a), que é uma dessas 4:
     * - "AP" se o(a) aluno(a) foi aprovado(a).
     * - "RM" se foi reprovado(a) por média insuficiente.
     * - "RF" se foi reprovado(a) por falta.
     * - "RMF" se foi reprovado(a) por média insuficiente e por falta.
     *
     * - Lembrando também que é necessário pelo menos média 7 e 75% de presença.
     *
     * Dica: Use o método media() do exercício 7.
     *
     * @returns {String} A situação final do(a) aluno(a) na disciplina.
     */
    get situacao() {
        let foiOuNaoFoi = "";
        if (this.media < 7 && this.presenca < 75) {
            foiOuNaoFoi = "RMF";
        }else if (this.media < 7) {
            foiOuNaoFoi = "RM";
        }else if (this.presenca < 75) {
            foiOuNaoFoi = "RF";
        } else foiOuNaoFoi = "AP";
        return foiOuNaoFoi;
    }

    // EXERCÍCIO 9.
    /**
     * Este método é muito parecido com o do exercício anterior. No entanto, ele deve retornar a situação por exetenso.
     *
     * Ou seja:
     * - Deve retornar "aprovado" ou "aprovada" ao invés de "AP".
     * - Deve retornar "reprovado por média" ou "reprovada por média" ao invés de "RM".
     * - Deve retornar "reprovado por falta" ou "reprovada por falta" ao invés de "RF".
     * - Deve retornar "reprovado por média e falta" ou "reprovada por média e falta" ao invés de "RMF".
     *
     * Dica: Use o getter situacao definido no exercício 8 e use também o gênero do(a) aluno(a) para decidir o que
     * retornar.
     *
     * @returns {String} A situação final do(a) aluno(a) na disciplina, escrito por extenso.
     */
    get situacaoPorExtenso() {
        let saida = "";
        //Aprovadxs
        if (this.situacao === "AP" && this.genero === "M") {
            saida = "aprovado";
        }else if (this.situacao === "AP" && this.genero === "F") {
            saida = "aprovada";
        }
        //Reprovadxs por média
        else if (this.situacao === "RM" && this.genero === "M") {
            saida = "reprovado por média";
        }else if (this.situacao === "RM" && this.genero === "F") {
            saida = "reprovada por média";
        }
        //Reprovadxs por falta
        else if (this.situacao === "RF" && this.genero === "M") {
            saida = "reprovado por falta";
        }else if (this.situacao === "RF" && this.genero === "F") {
            saida = "reprovada por falta";
        }
        //Reprovadxs por média & falta
        else if (this.situacao === "RMF" && this.genero === "M") {
            saida = "reprovado por média e falta";
        }else// (this.situacao === "RMF" && this.genero === "F") 
            saida = "reprovada por média e falta";
        return saida;
    }

    // EXERCÍCIO 10.
    /**
     * Este método deve retornar uma string contendo uma frase de status do(a) aluno(a) no seguinte formato:
     * <nome> tem média <média> na disciplina de <disciplina> e foi <situação> com <presença>% de presença.
     *
     * É importante que a média tenha sempre uma casa decimal após a vírgula e que a presença seja uma
     * porcentagem inteira, sem casas decimais.
     *
     * Dica: Use os getters media e situacaoPorExtenso definidos nos exercícios 7 e 9.
     *
     * Exemplos:
     *
     * const c1 = new AlunoMatricula("Maria Luiza", "F", "Desenvolvimento de Aplicativos", [new Nota(8, 5), new Nota(9, 5)], 84);
     * const s1 = c1.status; // Isso vai ser "Maria Luiza tem média 8.5 na disciplina de Desenvolvimento de Aplicativos e foi aprovada com 84% de presença."
     *
     * const c2 = new AlunoMatricula("Roberto", "M", "Linguagens de Script para Web", [new Nota(3, 2.5), new Nota(4, 2.5), new Nota(7, 2.5), new Nota(2, 2.5)], 80);
     * const s2 = c2.status; // Isso vai ser "Roberto tem média 3.75 na disciplina de Linguagens de Script para Web e foi reprovado por média com 80% de presença."
     *
     * const c3 = new AlunoMatricula("Chiquinha", "F", "Química Orgânica III", [new Nota(8.5, 5), new Nota(9.5, 5)], 21);
     * const s3 = c3.status; // Isso vai ser "Chiquinha tem média 9 na disciplina de Química Orgânica III e foi reprovada por falta com 21% de presença."
     *
     * @returns {String} O status descritivo do(a) aluno(a).
     */
    get status() {
        const nome = this.nome;
        const media = this.media;
        const disciplina = this.disciplina;
        const situacao = this.situacaoPorExtenso;
        const presenca = this.presenca;

        const status = `${nome} tem média ${media} na disciplina de ${disciplina} e foi ${situacao} com ${presenca}% de presença.`;
        return status;
    }
}

// EXERCÍCIO 11.
/**
 * No formulário, ao clicar no botão "Adicionar nota", uma nova caixinha que permita a adição de uma nova nota deve
 * aparecer. Essa caixinha deve ser assim:
 *
 * <li>
 *     <div>
 *         <label for="XXX">Nota:</label>
 *         <input type="text" id="XXX" />
 *     </div>
 *     <div>
 *         <label for="YYY">Peso:</label>
 *         <input type="text" id="YYY" />
 *     </div>
 * </li>
 *
 * Onde XXX e YYY devem ser IDs que não existem em nenhum outro lugar da página.
 * Coloque esse <li> dentro do <ul> que está dentro da <div> com a classe ex11e13 no ado2.html.
 */

// Armazenar um contador para o ID da nota
let notaCounter = 1;

// Armazenar um contador para o ID do peso
let pesoCounter = 1;

function criarItemNota() {
    const ulElement = document.querySelector('.ex11a13 ul');
  
    const liElement = document.createElement('li');
  
    const div1Element = document.createElement('div');
  
    const novaNotaId = `nota-${notaCounter}`;
  

    const novaNotaLabel = document.createElement('label');
    novaNotaLabel.setAttribute('for', novaNotaId);
    novaNotaLabel.textContent = 'Nota:';
  
    const novaNotaInput = document.createElement('input');
    novaNotaInput.setAttribute('type', 'text');
    novaNotaInput.setAttribute('id', novaNotaId);
  
    div1Element.appendChild(novaNotaLabel);
    div1Element.appendChild(novaNotaInput);
  
    const div2Element = document.createElement('div');

    const novoPesoId = `peso-${pesoCounter}`;
    const novoPesoLabel = document.createElement('label');
    novoPesoLabel.setAttribute('for', novoPesoId);
    novoPesoLabel.textContent = 'Peso:';
  
    const novoPesoInput = document.createElement('input');
    novoPesoInput.setAttribute('type', 'text');
    novoPesoInput.setAttribute('id', novoPesoId);
  
    div2Element.appendChild(novoPesoLabel);
    div2Element.appendChild(novoPesoInput);
  
    liElement.appendChild(div1Element);
    liElement.appendChild(div2Element);
  
    ulElement.appendChild(liElement);
  
  }
  

// EXERCÍCIO 12.
/**
 * No formulário, ao clicar no botão "Remover nota", o último <li> criado no exercício 11 deve ser removido.
 * Se não houver mais nenhum <li> a ser removido, nada deve ser feito.
 */
function removerItemNota() {
    const ulElement = document.querySelector('.ex11a13 ul');
    const liElements = ulElement.querySelectorAll('li');
  
    if (liElements.length > 0) {
      const lastLiElement = liElements[liElements.length - 1];
      ulElement.removeChild(lastLiElement);
    }
}

// EXERCÍCIO 13.
/**
 * Esta função já está parcialmente feita.
 *
 * Ela permite ao usuário ler os dados correspondentes no formulário, criar uma instância de AlunoMatricula
 * e colocar o status dessa instância no elemento #situacao. Se ocorrer algum erro que impossibilite este processo,
 * a mensagem de erro será colocada em #situacao.
 *
 * Use as funções auxiliares disponibilizadas dentro da função. A função lerNumero(xxx) vem do utils.js. Você já a viu
 * antes no ADO 1.
 *
 * Um esqueleto da implementação final já foi deixado pelo professor para ajudar.
 * Dica: Procure ver funções de manipulação de DOM nas partes que faltam.
 * As partes que estão como naoFizIssoAinda(), embora nem todas se refiram ao DOM.
 *
 * As mensagens de erro que podem ser geradas são:
 * - Informe o nome do(a) aluno(a) corretamente.
 * - Escolha o gênero do(a) aluno(a) corretamente.
 * - Informe o nome da disciplina corretamente.
 * - Informe a nota corretamente.
 * - Informe o peso corretamente.
 * - Informe a presença corretamente.
 * - O peso das notas deve somar 10.
 * E as verificações correspondentes são executadas exatamente nesta ordem.
 */
function verificarAlunoMatriculado() {
    function lerNota(texto) {
        return lerNumero(texto, { min: 0, max: 10, casas: 2, erro: "Informe a nota corretamente." });
    }

    function lerPeso(texto) {
        return lerNumero(texto, { min: 0, max: 10, casas: 2, erro: "Informe o peso corretamente." });
    }

    function lerPresenca(texto) {
        return lerNumero(texto, { min: 0, max: 100, casas: 0, erro: "Informe a presença corretamente." });
    }

    function lerTexto(oQue, texto) {
        if (texto.trim() === "") throw new Error(`Informe ${oQue} corretamente.`);
        return texto.trim();
    }

    // Comece a mexer no código daqui para baixo.
    let texto;
    try {
        const nome = lerTexto("o nome do(a) aluno(a)", document.querySelector("#nome").value);
    
        const eleChecked = document.querySelector("#ele").checked;
        const elaChecked = document.querySelector("#ela").checked;
        if (!eleChecked && !elaChecked) throw new Error("Escolha o gênero do(a) aluno(a) corretamente.");
        const genero = eleChecked ? "M" : "F";
    
        const disciplina = lerTexto("o nome da disciplina", document.querySelector("#disciplina").value);
    
        const ados = [];
        const notaInputs = document.querySelectorAll(".ex11a13 input[id^='nota-']");
        const pesoInputs = document.querySelectorAll(".ex11a13 input[id^='peso-']");
        if (notaInputs.length !== pesoInputs.length) throw new Error("Informe a nota e o peso corretamente.");
    
        for (let i = 0; i < notaInputs.length; i++) {
          const nota = lerNota(notaInputs[i].value);
          const peso = lerPeso(pesoInputs[i].value);
          ados.push(new Nota(nota, peso));
        }
    
        const presenca = lerPresenca(document.querySelector("#presenca").value);
    
        if (ados.length === 0) {
            throw new Error("O peso das notas deve somar 10.");
          }

        const alunoMatricula = new AlunoMatricula(nome, genero, disciplina, ados, presenca);
        texto = alunoMatricula.status;
      } catch (e) {
        texto = e.message;
      }
      document.querySelector("#situacao").value = texto;
}

// EXERCÍCIO 14.
//
// Crie uma classe Circulo onde o construtor recebe o raio e que tenha os seguintes getters:
// * raio
// * diametro
// * area
// * circunferencia
// Se o raio recebido no construtor não for um número, lance um TypeError. Se for negativo, lance RangeError.

class Circulo {
    constructor(raio) {
      if (typeof raio !== "number" || isNaN(raio) || !isFinite(raio)) {
        throw new TypeError("O raio deve ser um número.");
      }
      if (raio < 0) {
        throw new RangeError("O raio não pode ser negativo.");
      }
      if (raio == NaN){
              throw new TypeError("Valor inválido ");
          }
      this.raio = raio;
    }
  
    get diametro() {
      return this.raio * 2;
    }
  
    get area() {
      return Math.PI * Math.pow(this.raio, 2);
    }
  
    get circunferencia() {
      return 2 * Math.PI * this.raio;
    }
}