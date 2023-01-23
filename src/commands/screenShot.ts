import { mouse, screen, Region } from '@nut-tree/nut-js';
import { Duplex } from 'stream';
import Jimp from 'jimp';
import { DIRECTION, screenShotSize } from '../constants/constants';

type CommandHandler = (name: string, webSocket: Duplex) => Promise<string>;
export const printScreen: CommandHandler = async (name, webSocket) => {
  const { x: currentX, y: currentY } = await mouse.getPosition();

  const invertedImage = await screen.grabRegion(
    new Region(
      Math.max(0, currentX - screenShotSize.SCREENSHOT_WIDTH / 2),
      Math.max(0, currentY - screenShotSize.SCREENSHOT_HEIGHT / 2),
      screenShotSize.SCREENSHOT_WIDTH,
      screenShotSize.SCREENSHOT_HEIGHT
    )
  );

  const rgbImage = await invertedImage.toRGB();

  const jimpImage = new Jimp({
    data: rgbImage.data,
    width: rgbImage.width,
    height: rgbImage.height,
  });

  const imgBase64 = await jimpImage.getBase64Async(Jimp.MIME_PNG);

  webSocket.write(`${DIRECTION.prnt_scrn} ${imgBase64.split(',').at(-1)}`);

  return `Screenshot captured, base64 buffer is ${imgBase64}`;
};
