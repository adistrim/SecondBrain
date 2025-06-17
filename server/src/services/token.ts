import jwt from 'jsonwebtoken';
import { SECRET } from 'src/config';

export function generateTokenService(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: '24h'});
}
