import { Router } from 'express';
import { 
  Index, Create,
  Update, Delete
} from './controller';

const router = Router();

router.get('/', Index);
router.post('/', Create);
router.put('/:id', Update);
router.delete('/:id', Delete);


export default router;