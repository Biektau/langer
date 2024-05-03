import { Request } from "express";

export function getClientIp(req: Request): string | undefined {
  // Получаем значение заголовка 'x-forwarded-for'
  let forwardedIpsStr = req.header("x-forwarded-for");

  if (forwardedIpsStr) {
    // Разделяем строку на массив IP-адресов
    const forwardedIps = forwardedIpsStr.split(",");
    // Выбираем первый IP-адрес из списка
    const firstIp = forwardedIps[0].trim();
    // Если первый IP-адрес начинается с "::ffff:", удаляем префикс
    return firstIp.startsWith("::ffff:") ? firstIp.slice(7) : firstIp;
  }

  const result = req.connection.remoteAddress?.startsWith("::ffff:")
    ? req.connection.remoteAddress.slice(7)
    : req.connection.remoteAddress;
  // Если заголовок 'x-forwarded-for' отсутствует, используем 'req.connection.remoteAddress'
  return result;
}
