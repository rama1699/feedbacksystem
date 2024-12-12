import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FeedbackFormComponent } from './app/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './app/feedback-list/feedback-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedbackFormComponent, FeedbackListComponent],
  template: `
    <div class="container">
      <h1>Feedback System</h1>
      <app-feedback-form></app-feedback-form>
      <app-feedback-list></app-feedback-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
  `]
})
export class App {
  name = 'Feedback System';
}

bootstrapApplication(App);