import {Component, OnInit} from '@angular/core';
import {Favorite} from '../../../models/media/favorite';
import {FavoriteService} from '../../../services/user/favorite.service';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  favoriteList: Favorite;

  constructor(private favService: FavoriteService,
              public helperService: HelperService) {
  }

  ngOnInit(): void {
    this.favService.getUserFavoriteList(+localStorage.getItem('favoriteListId'))
      .subscribe((fav: Favorite) => {
        this.favService.favoriteList.next(
          fav
        );
      });
    this.favService.favoriteList.subscribe((fav: Favorite) => {
      this.favoriteList = fav;
    });
  }

  removeTrack(trackId: number) {
    this.favService.removeTrackFavoriteList(this.favoriteList.id, trackId)
      .subscribe(() => {
        for (let i = 0; i < this.favoriteList.tracks.length; i++) {
          if (this.favoriteList.tracks[i].id === trackId) {
            this.helperService
              .openSnackbar(`Track ${this.favoriteList.tracks[i].title}
              removed successfully`, 'Okay');
            this.favoriteList.tracks.splice(i, 1);
            break;
          }
        }
        this.favService.favoriteList.next(this.favoriteList);
      });
  }

  clearFavoriteList() {
    this.favService.clearFavoriteListContent(this.favoriteList.id)
      .subscribe((fav: Favorite) => {
        this.helperService.hideModal();
        this.helperService
          .openSnackbar(`Favorite List cleared successfully`, 'Okay');
        this.favService.favoriteList.next(fav);
      });
  }

}
