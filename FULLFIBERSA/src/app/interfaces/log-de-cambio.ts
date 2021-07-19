

export interface LogDeCambio {
    administrador: any;
    cliente: any;
    campanhaAnterior: any;
    campanhaNueva: any;
    comentarioCambio: String;
}

export interface LogDeCambioRecibido {
    idLogCambio: number;
    administrador: any;
    cliente: any;
    campanhaAnterior: any;
    campanhaNueva: any;
    comentarioCambio: String;
    fechaCambioLog: Date;
}
