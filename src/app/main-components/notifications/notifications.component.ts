import {Component, Input, OnInit} from '@angular/core';
import {SubscribersNotifications} from '../../models/notification/models/subscribers-notification';
import {AuthService} from '../../services/auth/auth.service';
import {HelperService} from '../../Shared/services/helper.service';
import {SwPush} from '@angular/service-worker';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Subscriber} from '../../models/notification/models/subscriber';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() sidenav: MatSidenav;
  subscriberNotifications: SubscribersNotifications[];
  notSubscriber: boolean;
  subscriber: PushSubscription;

  constructor(private authService: AuthService,
              private helperService: HelperService,
              private swPush: SwPush) {

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getSubscriberNotifications()
        .subscribe((subNotifications: SubscribersNotifications[]) => {
          if (subNotifications) {
            this.prepareNotifications(subNotifications);
          } else {
            this.notSubscriber = true;
          }
        });
    }
  }

  prepareNotifications(notifications) {
    this.authService.subscriberNotifications.next(notifications);
    this.authService.subscriberNotifications.subscribe((data: SubscribersNotifications[]) => {
      this.subscriberNotifications = data;
    });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: ApiEndpoints.vapidKeys.publicKey
    }).then(subscriber => {
      this.subscriber = subscriber;
      this.authService.newSubscriber(subscriber).subscribe((sub: Subscriber) => {
        this.prepareNotifications(sub.subscribersNotifications);
        this.helperService.openSnackbar(
          'Now, you are a new subscriber, and you will get our newsletter',
          'Okay'
        );
      }, error => {
        this.helperService.openSnackbar(
          'Could not send subscription object to server',
          'Okay'
        );
      });
    }).catch(err => {
      this.helperService.openSnackbar(
        'Could not send subscription object to server',
        'Okay'
      );
      console.error(err);
    });
  }


}
