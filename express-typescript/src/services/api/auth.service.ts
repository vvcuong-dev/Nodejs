import { prisma } from "../../libs/prisma";
import { LoginData } from "../../types/auth.type";
import { verifyPassword } from "../../utils/hash";
import { generateToken, verifyToken } from "../../utils/jwt";

export const apiAuthService = {
  login: async (data: LoginData) => {
    const { email, password } = data;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return false;
    }

    const hashPassword = user.password;
    if (!verifyPassword(password, hashPassword)) {
      return false;
    }

    // Tạo token
    const token = generateToken({ userId: user.id, email: user.email });

    return token;
  },
  getProfile: async (token: string) => {
    const decoded = verifyToken(token);

    /**
     * decoded là một đối tượng chứa thông tin giải mã từ token, bao gồm userId và email. Nếu token không hợp lệ hoặc hết hạn, decoded sẽ là false.
     * Nếu decoded là false, nghĩa là token không hợp lệ hoặc hết hạn, nên hàm sẽ trả về false.
     */

    if (!decoded) {
      return false;
    }

    const userId = decoded.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return false;
    }

    return user;
  },
  logout: async (jti: string, userId: number) => {
    // Xử lý logout, ví dụ: lưu jti vào blacklist để không chấp nhận token này nữa
    // Cách đơn giản nhất là lưu jti vào một bảng trong database hoặc một cache như Redis
    // Khi xác thực token, bạn sẽ kiểm tra xem jti có nằm trong blacklist hay không
    const blacklist = await prisma.tokenBlacklist.create({
      data: {
        userId: userId,
        jti: jti,
      },
    });

    return blacklist;
  },
};
