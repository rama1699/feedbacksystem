import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService, Feedback } from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="feedback-list">
      <h2>Feedback List</h2>
      
      <div class="search-section">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          placeholder="Search feedbacks..."
          (keyup.enter)="search()"
        >
        <button (click)="search()">Apply</button>
      </div>

      <div *ngIf="searchPerformed" class="search-results">
        Found {{ feedbacks.length }} results
      </div>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let feedback of feedbacks">
            <td>{{ feedback.email }}</td>
            <td>{{ feedback.name }}</td>
            <td>{{ feedback.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .feedback-list {
      margin: 20px;
    }
    .search-section {
      margin-bottom: 20px;
    }
    input {
      padding: 8px;
      margin-right: 10px;
      width: 200px;
    }
    button {
      padding: 8px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    .search-results {
      margin-bottom: 10px;
      font-style: italic;
    }
  `]
})
export class FeedbackListComponent {
  feedbacks: Feedback[] = [];
  searchTerm = '';
  searchPerformed = false;

  constructor(private feedbackService: FeedbackService) {
    this.feedbackService.getFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

  search() {
    if (this.searchTerm.trim()) {
      this.feedbacks = this.feedbackService.searchFeedbacks(this.searchTerm);
    } else {
      this.feedbackService.getFeedbacks().subscribe(feedbacks => {
        this.feedbacks = feedbacks;
      });
    }
    this.searchPerformed = true;
  }
}