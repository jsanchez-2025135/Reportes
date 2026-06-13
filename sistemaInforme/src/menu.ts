import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { Incidente, Prioridad, EstadoIncidente } from './types.js';

const rl = createInterface({ input, output });
const listaIncidentes: Incidente[] = [];

function validarPrioridad(input: string): input is Prioridad {
    return ['alta', 'medio', 'baja'].includes(input);
}

function validarEstado(input: string): input is EstadoIncidente {
    return ['abierto', 'en progreso', 'resuelto'].includes(input);
}

async function registrarIncidente() {
    console.log("\n REGISTRAR NUEVO INCIDENTE ");
    
    const titulo = await rl.question('Título: ');
    const reportadoPor = await rl.question('Reportado por: ');

    let prioridad: string;
    do {
        prioridad = await rl.question('Prioridad (alta, medio, baja): ');
        prioridad = prioridad.toLowerCase().trim();
    } while (!validarPrioridad(prioridad));

    let estado: string;
    do {
        estado = await rl.question('Estado (abierto, en progreso, resuelto): ');
        estado = estado.toLowerCase().trim();
    } while (!validarEstado(estado));

    const nuevoIncidente: Incidente = {
        id: listaIncidentes.length + 1,
        titulo,
        reportadoPor,
        prioridad,
        estado,
        fechaCreacion: new Date()
    };

    listaIncidentes.push(nuevoIncidente);
    console.log("\n ¡Incidente registrado con éxito!");
}

function verReportes() {
    console.log("------------------------------------")
    console.log("        LISTADO DE REPORTES         ");
    if (listaIncidentes.length === 0) {
        console.log(" No hay incidentes registrados aún.");
        return;
    }

    listaIncidentes.forEach((incidente) => {
        console.log(`\n ID: ${incidente.id} - ${incidente.titulo.toUpperCase()}`);
        console.log(`Reportado por: ${incidente.reportadoPor}`);
        console.log(`Prioridad: ${incidente.prioridad}`);
        console.log(`Estado: ${incidente.estado}`);
        console.log(`Fecha: ${incidente.fechaCreacion.toLocaleString()}`);
        console.log("----------------------------------------");
    });
}

export async function iniciarMenu() {
    let continuar = true;

    while (continuar) {
        console.log("   SISTEMA DE INCIDENTES     ");
        console.log("1. Registrar nuevo incidente");
        console.log("2. Ver todos los reportes");
        console.log("3. Salir");
        
        const opcion = await rl.question('\nSeleccione una opción (1-3): ');

        switch (opcion.trim()) {
            case '1':
                await registrarIncidente();
                break;
            case '2':
                verReportes();
                break;
            case '3':
                continuar = false;
                rl.close();
                break;
            default:
                console.log("\n Opción no válida. Intente de nuevo.");
        }
    }
}