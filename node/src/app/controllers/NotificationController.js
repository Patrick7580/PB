import * as Yup from 'yup';
import { Op } from 'sequelize';
import TblNotification from '../models/TblNotification';

class NotificationController {
  async index(req, res) {
    try {
      const { Type, UserId } = req.query;
      let TblNotifications = [];

      const attributes = ['NotificationId','UserId', 'Type', 'EventId', 'ComplaintId','En_Title','Hi_Title','ImageName','Seen','IsActive','CreatedBy','CreatedDate','ModifiedBy','ModifiedDate'];

      switch (true) {
        case Type && UserId == null: {
            TblNotifications = await TblNotification.findAll({
            where: { Type: { [Op.like]: `${Type}%` } },
            // include: ['addresses', 'phones'],
            attributes,
          });
          break;
        }
        case UserId && Type == null: {
            TblNotifications = await TblNotification.findAll({
            where: { UserId: { [Op.like]: `${UserId}%` } },
            attributes,
          });
          break;
        }
        case UserId && Type: {
            TblNotifications = await TblNotification.findAll({
            where: {
                Type: { [Op.like]: `${Type}%` },
                UserId: { [Op.like]: `${UserId}%` },
              attributes,
            },
          });
          break;
        }
        default:
            TblNotifications = await TblNotification.findAll({
            attributes,
          });
          break;
      }

      return res.status(200).json(TblNotifications);
    } catch (error) {
      return res.status(400).json({ error: 'Unable to find Notifications' });
    }
  }

  async show(req, res) {
    const { NotificationId } = req.params;
    const attributes = ['NotificationId','UserId', 'Type', 'EventId', 'ComplaintId','En_Title','Hi_Title','ImageName','Seen','IsActive','CreatedBy','CreatedDate','ModifiedBy','ModifiedDate'];

    try {
      const Notifications = await TblNotification.findOne({
        where: { NotificationId },
        attributes,
      });

      if (!Notifications) {
        return res.status(400).json({ error: 'Notification not found' });
      }

      return res.status(200).json(Notifications);
    } catch (error) {
      return res.status(500).json({ error: 'Unable to find Notification' });
    }
  }

}

export default new NotificationController();