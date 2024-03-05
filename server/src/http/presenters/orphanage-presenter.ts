import { Image, Orphanage } from "@prisma/client";

import { ImagePresenter } from "./image-presenter";

type OrphanagePresenterProps = Orphanage & {
  images?: Image[];
};

export class OrphanagePresenter {
  static render(orphanage: OrphanagePresenterProps) {
    return {
      ...orphanage,
      images: orphanage.images ? ImagePresenter.renderMany(orphanage?.images) : undefined
    };
  }

  static renderMany(orphanages: OrphanagePresenterProps[]) {
    return orphanages.map(this.render);
  }
}