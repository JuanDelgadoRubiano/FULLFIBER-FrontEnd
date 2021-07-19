import { TiposProductos } from "./tipos-productos";

export interface ProductoEnviado {
    nombreProducto: string;
    descripcionProducto: string;
    tipoProducto: TiposProductos;
}

export interface ProductoRecibido {
    idProducto: number;
    nombreProducto: string;
    descripcionProducto: string;
    tipoProducto: TiposProductos;

}
