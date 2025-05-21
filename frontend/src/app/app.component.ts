import { Component } from '@angular/core';
import { CheckActivityService } from './services/check-activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cafeMangement3Frontend';
  constructor(
    private checkActivityService: CheckActivityService //private activityService: ActivityService // Injection du service de détection d'inactivité
  ) {}

  ngOnInit() {
    this.checkActivityService.startChecking();
  }
}
