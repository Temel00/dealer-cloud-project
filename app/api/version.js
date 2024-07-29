import { APP_VERSION } from '../../version';

export default function handler(req, res) {
    res.status(200).json({ version: APP_VERSION });
}