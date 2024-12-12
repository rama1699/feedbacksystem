import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Feedback {
  email: string;
  name: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks: Feedback[] = [];
  private feedbacksSubject = new BehaviorSubject<Feedback[]>([]);

  submitFeedback(feedback: Feedback) {
    this.feedbacks.push(feedback);
    this.feedbacksSubject.next(this.feedbacks);
    return true;
  }

  getFeedbacks() {
    return this.feedbacksSubject.asObservable();
  }

  searchFeedbacks(keyword: string) {
    const searchResults = this.feedbacks.filter(feedback => 
      feedback.email.toLowerCase().includes(keyword.toLowerCase()) ||
      feedback.name.toLowerCase().includes(keyword.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(keyword.toLowerCase())
    );
    return searchResults;
  }
}