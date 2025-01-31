import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './model/Question';

@Injectable()
export class QuizService {
  private jsonUrl = 'questions.json';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.jsonUrl);
  }
}
