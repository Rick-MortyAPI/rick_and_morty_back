import { Request, Response } from 'express';
import { CapturadosService } from '../services/capturados.service';
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } from '../utilities/status.utility';

export class CapturadosController {
    private capturadosService: CapturadosService;

    constructor() {
        this.capturadosService = new CapturadosService();
    }

    public getAllCapturados = async (req: Request, res: Response) => {
        try {
            const capturados = await this.capturadosService.getAllCapturados();
            return res.status(OK_STATUS).json(capturados);
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public saveCapturado = async (req: Request, res: Response) => {
        const capturado = req.body;

        try {
            await this.capturadosService.saveCapturado(capturado);
            return res.status(CREATED_STATUS).json(capturado);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            return res.status(CONFLICT_STATUS).json({ error: error.message });
        }
    }

    public deleteCapturado = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await this.capturadosService.deleteCapturado(+id);
            return res.status(OK_STATUS).json({ message: `Capturado con id: ${id} eliminado correctamente.` });
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }
}
