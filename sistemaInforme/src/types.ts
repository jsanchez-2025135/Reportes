export type Prioridad = 'alta' | 'medio' | 'baja';
export type EstadoIncidente = 'abierto' | 'en progreso' | 'resuelto';

export interface Incidente {
    id: number;
    titulo: string;
    reportadoPor: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}