import { Router } from 'express';
import { 
  Index, Create
} from './controller';

const router = Router();

router.get('/:email', Index);
router.post('/', Create);

export default router;