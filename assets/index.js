function configurarCamposDeNota() {
    const campos = [
        'cp1-1', 'cp2-1', 'cp3-1', 'sp1-1', 'sp2-1', 'gs-1',
        'cp1-2', 'cp2-2', 'cp3-2', 'sp1-2', 'sp2-2', 'gs-2'
    ];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        campo.onfocus = () => { if (campo.value === '0') campo.value = ''; };
        campo.onblur = () => { if (campo.value === '') campo.value = '0'; };
    });
}

function validaNota(nota, maximo, elemento) {
    if (nota < 0 || nota > maximo) {
        alert(`Valor Inválido! As notas devem estar entre 0 e ${maximo}.`);
        elemento.value = '';
        elemento.focus();
        return false;
    }
    return true;
}

function notasCheckpoint(semestre) {
    const cp1Elem = document.getElementById(`cp1-${semestre}`);
    const cp2Elem = document.getElementById(`cp2-${semestre}`);
    const cp3Elem = document.getElementById(`cp3-${semestre}`);
    const notas = [parseFloat(cp1Elem.value), parseFloat(cp2Elem.value), parseFloat(cp3Elem.value)];

    if (notas.some((nota, index) => !validaNota(nota, 10, [cp1Elem, cp2Elem, cp3Elem][index]))) {
        return null;
    }

    return notas.sort((a, b) => b - a).slice(0, 2);
}

function calculaSprintCp(semestre) {
    const sprint1Elem = document.getElementById(`sp1-${semestre}`);
    const sprint2Elem = document.getElementById(`sp2-${semestre}`);
    const globalElem = document.getElementById(`gs-${semestre}`);

    const [nota1, nota2] = notasCheckpoint(semestre);
    if (nota1 === null) return;

    const sprint1 = parseFloat(sprint1Elem.value);
    const sprint2 = parseFloat(sprint2Elem.value);
    const global = parseFloat(globalElem.value);

    if (!validaNota(sprint1, 100, sprint1Elem) || !validaNota(sprint2, 100, sprint2Elem) || !validaNota(global, 100, globalElem)) {
        return;
    }

    const notaParcial = ((nota1 * 10 + nota2 * 10 + sprint1 + sprint2) / 4) * 0.4;
    return notaParcial + (global * 0.6);
}

function calcularMediaSemestral(semestre) {
    const notaFinal = calculaSprintCp(semestre);
    if (notaFinal !== undefined) {
        document.getElementById(`resultado-${semestre}`).textContent = notaFinal.toFixed(2);
    }
}

document.getElementById('botao-media-1').addEventListener('click', () => calcularMediaSemestral('1'));
document.getElementById('botao-media-2').addEventListener('click', () => calcularMediaSemestral('2'));

window.onload = configurarCamposDeNota;
