import { Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service';
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } from '../utilities/status.utility';
import { updateUsuariosSchema } from '../dto/usuarios';

export class UsuariosController {
    private usuariosService: UsuariosService;

    constructor() {
        this.usuariosService = new UsuariosService();
    }

    public getAllUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = await this.usuariosService.getAllUsuarios();
            return res.status(OK_STATUS).json(usuarios);
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public findUsuarioById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const usuario = await this.usuariosService.findUsuarioById(+id);
            return res.status(OK_STATUS).json(usuario);
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }

    public saveUsuario = async (req: Request, res: Response) => {
        const usuario = req.body;

        try {
            await this.usuariosService.saveUsuario(usuario);
            return res.status(CREATED_STATUS).json(usuario);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            return res.status(CONFLICT_STATUS).json({ error: error.message });
        }
    }

    public updateUsuario = async (req: Request, res: Response) => {
        const usuario = req.body;
        const { error } = updateUsuariosSchema.validate(usuario);

        if (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.details.map(detail => detail.message) });
        }
    
        try {
            const usuarioActualizado = await this.usuariosService.updateUsuario(usuario);
            return res.status(OK_STATUS).json(usuarioActualizado);
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    };
    

    public deleteUsuario = async (req: Request, res: Response) => {
        console.log("ENTRO AQUI");
        const { id } = req.params;
    
        if (isNaN(Number(id))) {
            return res.status(BAD_REQUEST_STATUS);
        }
    
        try {
            await this.usuariosService.deleteUsuario(+id);
            return res.status(OK_STATUS).json({ message: `Usuario con id: ${id} eliminado correctamente.` });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    };
    
}
