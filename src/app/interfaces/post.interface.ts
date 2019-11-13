export interface Post {
  id?: number;
  titulo: string;
  fecha_publicacion: string;
  contenido: string;
  estatus: string;
  usuario_id: number;
  categoria_id: number;
}