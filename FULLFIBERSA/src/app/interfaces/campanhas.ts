import { AdministradoresRecibir } from "./administradores";
import { ProductoRecibido } from "./productos";

export interface CampanhasEnviar {
    precioCampanha: number;
    fechaInicioCampanha: Date;
    fechaFinalCampanha: Date;
    condicionCalificacion: number;
    condicionFacturaGeneralInicio: number;
    condicionFacturaGeneralFinal: number;
    condicionFacturaInicio: number;
    condicionFacturaFinal: number;
    descripcionCampanha: string;
    estadoCampanha: number;
    administradores: AdministradoresRecibir;
    producto: ProductoRecibido;
}

export interface CampanhasRecibida {
    idCampanha: number;
    precioCampanha: number;
    fechaInicioCampanha: Date;
    fechaFinalCampanha: Date;
    condicionCalificacion: number;
    condicionFacturaGeneralInicio: number;
    condicionFacturaGeneralFinal: number;
    condicionFacturaInicio: number;
    condicionFacturaFinal: number;
    descripcionCampanha: string;
    estadoCampanha: number;
    administradores: AdministradoresRecibir;
    producto: ProductoRecibido;
}

