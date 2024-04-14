import { jwtDecode, type JwtPayload } from "jwt-decode";

type CustomJwtPayload = {
  status: true | false;
  message: string;
  jwtPayload: JwtPayload;
};

export const checkExpJsonWebToken = (token: string): CustomJwtPayload => {
  try {
    if (!token) {
      return {
        status: false,
        message: "No token provided",
        jwtPayload: {},
      };
    }

    const decodedToken = jwtDecode(token) as CustomJwtPayload["jwtPayload"];

    const exp = decodedToken?.exp;

    const currentTime = Date.now() / 1000;
    if (exp && currentTime > exp) {
      return {
        status: false,
        message: "Token expired",
        jwtPayload: decodedToken,
      };
    }

    return {
      status: true,
      message: "Token valid",
      jwtPayload: decodedToken,
    };
  } catch (e) {
    return {
      status: false,
      message: "Error in token validation",
      jwtPayload: {},
    };
  }
};

/*export function checkExpRefreshToken(expiration: number): ExpirationPayload {
  try {
    const currentTime = new Date().getTime();

    const expirationTimestamp = currentTime + expiration;

    if (currentTime > expirationTimestamp) {
      return {
        status: false,
        message: "Token expired",
      };
    }

    return {
      status: true,
      message: "Token valid",
    };
  } catch (e) {
    return {
      status: false,
      message: "Error in token validation",
    };
  }
}*/
