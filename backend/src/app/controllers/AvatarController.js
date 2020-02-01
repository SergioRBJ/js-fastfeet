import Avatar from '../models/Avatar';
import Sender from '../models/Sender';

class AvatarController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { id } = req.params;

    const file = await Avatar.create({
      name,
      path,
    });

    await Sender.update({ avatar_id: file.id }, { where: { id } });

    return res.json(file);
  }
}

export default new AvatarController();
