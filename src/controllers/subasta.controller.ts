import { Request, Response } from 'express';
import { SubastaService } from '../services/subasta.service';
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } from '../utilities/status.utility';

export class SubastasController {
    private subastasService: SubastaService;

    constructor() {
        this.subastasService = new SubastaService();
    }

    public getAllSubastas = async (req: Request, res: Response) => {
        try {
            const subastas = await this.subastasService.getAllSubastas();
            return res.status(OK_STATUS).json(subastas);
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public getSubastaById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const subasta = await this.subastasService.findSubastaById(+id);
            return res.status(OK_STATUS).json(subasta);
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }

    public saveSubasta = async (req: Request, res: Response) => {
        const subasta = req.body;

        try {
            await this.subastasService.saveSubasta(subasta);
            return res.status(CREATED_STATUS).json(subasta);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            return res.status(CONFLICT_STATUS).json({ error: error.message });
        }
    }

    public updateSubasta = async (req: Request, res: Response) => {
        try {
            const subastaActualizada = await this.subastasService.updateSubasta(req.body);
            return res.status(OK_STATUS).json(subastaActualizada);
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message }); 
        }
    };
    

    public deleteSubasta = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await this.subastasService.deleteSubasta(+id);
            return res.status(OK_STATUS).json({ message: `Subasta con id: ${id} eliminada correctamente.` });
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }

    public confirmSubasta = async (req: Request, res: Response) => {
        const { subastaId, userId, idPersonajeIntercambio } = req.body;
        try {
            const result = await this.subastasService.confirmSubasta(subastaId, userId, idPersonajeIntercambio);
            return res.status(OK_STATUS).json(result);
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    };
}
