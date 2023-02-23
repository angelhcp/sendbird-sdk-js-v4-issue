import initMiddleware from "@/utils/initMiddleware";
import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";
import Cors from "cors";
import SendBird from "sendbird";

const cors = initMiddleware(Cors({ origin: "*", methods: ["GET"] }));

const serverError = ({ res, error: { code, name, message } }) => {
  res.status(500).json({ code, name, message });
};

const badRequestError = {
  code: 400,
  name: "Bad Request",
  message: "Username and Token are required",
};

export default async function handler(req, res) {
  await cors(req, res);

  const appId = process.env.SB_APP_ID || "";
  const user = process.env.SB_USER_ID || "";
  const token = process.env.SB_TOKEN || "";
  if (!appId || !token || !user) return res.status(400).json(badRequestError);

  const sb = new SendBird({ appId });

  try {
    await sb.connect(user, token);
    const unreadMessages = await sb.getTotalUnreadMessageCount();
    await sb.disconnect();
    res.status(200).json({ unread_messages: unreadMessages });
  } catch (error) {
    await sb.disconnect();
    serverError({ res, error });
  }
}
