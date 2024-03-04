import { Image } from "@prisma/client";

export class ImagePresenter {
  static render(image: Image) {
    return {
      id: image.id,
      path: image.path,
      url: image.path.startsWith('http') ? image.path : `http://localhost:3333/uploads/${image.path}`,
    };
  }

  static renderMany(images: Image[]) {
    return images.map(this.render);
  }
}