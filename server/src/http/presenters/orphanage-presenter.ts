import { Image, Orphanage } from "@prisma/client";

import { ImagePresenter } from "./image-presenter";

type OrphanagePresenterProps = Orphanage & {
  images: Image[];
};

export class OrphanagePresenter {
  static render(orphanage: OrphanagePresenterProps) {
    return {
      ...orphanage,
      images: ImagePresenter.renderMany(orphanage.images)
    };
  }

  static renderMany(orphanages: OrphanagePresenterProps[]) {
    return orphanages.map(this.render);
  }
}