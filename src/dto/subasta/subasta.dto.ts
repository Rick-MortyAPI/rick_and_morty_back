export enum EstadoSubasta {
    Disponible = 'Disponible',
    Completado = 'Completado',
}

export class SubastaDto {
    id: number;
    horaInicial: Date;
    horaFinal: Date;
    idCapturado: number;
    estado: EstadoSubasta;
}
