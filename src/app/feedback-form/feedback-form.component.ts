import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="feedback-form">
      <h2>Submit Feedback</h2>
      <form [formGroup]="feedbackForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email *</label>
          <input id="email" type="email" formControlName="email">
          <div *ngIf="feedbackForm.get('email')?.invalid && feedbackForm.get('email')?.touched" class="error">
            Valid email is required
          </div>
        </div>

        <div class="form-group">
          <label for="name">Name *</label>
          <input id="name" type="text" formControlName="name">
          <div *ngIf="feedbackForm.get('name')?.invalid && feedbackForm.get('name')?.touched" class="error">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="comment">Comment *</label>
          <textarea id="comment" formControlName="comment"></textarea>
          <div *ngIf="feedbackForm.get('comment')?.invalid && feedbackForm.get('comment')?.touched" class="error">
            Comment is required
          </div>
        </div>

        <button type="submit" [disabled]="feedbackForm.invalid">Submit Feedback</button>
      </form>
      <div *ngIf="submitted" class="success-message">
        You've successfully submitted your feedback
      </div>
    </div>
  `,
  styles: [`
    .feedback-form {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 5px;
    }
    .error {
      color: red;
      font-size: 12px;
    }
    .success-message {
      color: green;
      margin-top: 10px;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
    }
  `]
})
export class FeedbackFormComponent {
  feedbackForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.feedbackService.submitFeedback(this.feedbackForm.value);
      this.submitted = true;
      this.feedbackForm.reset();
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }
}