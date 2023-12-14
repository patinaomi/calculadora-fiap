let notaFinal;

function configurarCamposDeNota() {
  const campos = ['cp1-1', 'cp2-1', 'cp3-1', 'sp1-1', 'sp2-1', 'gs-1', 'cp1-2', 'cp2-2', 'cp3-2', 'sp1-2', 'sp2-2', 'gs-2'];
  campos.forEach(id => {
      const campo = document.getElementById(id);
      if (campo) {
          campo.onfocus = function() {
              if (this.value === '0') {
                  this.value = '';
              }
          };
          campo.onblur = function() {
              if (this.value === '') {
                  this.value = '0';
              }
          };
      }
  });
}

window.onload = configurarCamposDeNota;


function validaNota(nota, maximo, elemento) {
    if (nota < 0 || nota > maximo) {
        alert(`Valor Inválido! As notas devem estar entre 0 e ${maximo}.`);
        elemento.value = '';
        elemento.focus();
        return false;
    }
    return true;
}

function notasCheckpoint(cp1, cp2, cp3) {
    let elementos = [document.getElementById('cp1-1'), document.getElementById('cp2-1'), document.getElementById('cp3-1')];

    if (!validaNota(cp1, 10, elementos[0]) || !validaNota(cp2, 10, elementos[1]) || !validaNota(cp3, 10, elementos[2])) {
        return null;
    }

    let notas = [cp1, cp2, cp3];
    notas.sort((a, b) => b - a);

    return [notas[0], notas[1]];
}

function calculaSprintCp() {
    let cp1Elem = document.getElementById('cp1-1');
    let cp2Elem = document.getElementById('cp2-1');
    let cp3Elem = document.getElementById('cp3-1');

    let cp1 = parseFloat(cp1Elem.value);
    let cp2 = parseFloat(cp2Elem.value);
    let cp3 = parseFloat(cp3Elem.value);

    let sprint1Elem = document.getElementById('sp1-1');
    let sprint2Elem = document.getElementById('sp2-1');
    let globalElem = document.getElementById('gs-1');

    let sprint1 = parseFloat(sprint1Elem.value);
    let sprint2 = parseFloat(sprint2Elem.value);
    let global = parseFloat(globalElem.value);

    if (!validaNota(sprint1, 100, sprint1Elem) || !validaNota(sprint2, 100, sprint2Elem) || !validaNota(global, 100, globalElem)) {
        return;
    }

    let [nota1, nota2] = notasCheckpoint(cp1, cp2, cp3);
    if (nota1 === null || nota2 === null) {
        return;
    }

    nota1 *= 10;
    nota2 *= 10;
    let notaParcial = ((nota1 + nota2 + sprint1 + sprint2) / 4) * 0.4;

    notaFinal = notaParcial + (global * 0.6);
}

function calcularMediaSemestral() {
    if (notaFinal !== undefined) {
        document.getElementById('resultado-1').textContent = notaFinal.toFixed(2);
    }
}

function calcularMedia() {
    calculaSprintCp();
    calcularMediaSemestral();
}

document.querySelector('.botao-media').addEventListener('click', calcularMedia);