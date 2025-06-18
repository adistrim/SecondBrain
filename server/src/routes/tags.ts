import { createTag, getTags } from "../services/tags";
import validateToken from "../middlewares/validateToken";
import { Request, Response, Router } from "express";

const tagRouter = Router();


tagRouter.post('/create', validateToken, async(req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await createTag(name)
    res.status(201).json({ message: 'Tag created successfully' });
  } catch (error: any) {
    if (error.message === 'Tag Already Exists') {
      res.status(409).json({ error: 'Tag Already Exists' });
    } else if (error.message === 'Unauthorized') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})

tagRouter.get('/get', async(_, res: Response) => {
  try {
    const tags = await getTags()
    res.status(200).json(tags);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})

export default tagRouter;
