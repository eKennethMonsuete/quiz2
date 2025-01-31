import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { Question } from './model/Question';
import { QuizService } from './quiz.service';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'app-quiz1',
    imports: [ButtonModule, ListboxModule, FormsModule, CommonModule, CardModule, MessageModule],
    providers: [QuizService],
    templateUrl: './quiz1.component.html',
    styleUrl: './quiz1.component.scss'
})
export class Quiz1Component implements OnInit {
    questions: Question[] = [];
    currentQuestionIndex = 0;
    selectedAnswerIndex: number | null = null;
    isAnswerChecked = false;
    score = 0;
    showResults = false;

    constructor(private quizService: QuizService) {}

    ngOnInit() {
        this.loadQuestions();
    }

    loadQuestions(): void {
        this.quizService.getQuestions().subscribe(
            (data) => {
                this.questions = data;
                console.log('questoes carregadas', this.questions); // Verificando se as questões foram carregadas corretamente
            },
            (error) => {
                console.error('Erro ao carregar as questões:', error);
            }
        );
    }

    checkAnswer(): void {
        this.isAnswerChecked = true;
        if (this.selectedAnswerIndex === this.questions[this.currentQuestionIndex].correctAnswer) {
            this.score++;
        }
    }
    getEnunciado(): string {
        if (this.questions && this.questions[this.currentQuestionIndex] && this.questions[this.currentQuestionIndex].enunciado) return this.questions[this.currentQuestionIndex].enunciado;
        return '';
    }

    getExplanation() {
        if (this.questions && this.questions[this.currentQuestionIndex] && this.questions[this.currentQuestionIndex].explanation) {
            return this.questions[this.currentQuestionIndex].explanation;
        }
        return '';
    }

    // Selecionar uma alternativa
    selectAnswer(index: number | null): void {
        if (index !== null) {
            this.selectedAnswerIndex = index;
        }
    }

    // Ir para a próxima pergunta
    nextQuestion(): void {
        this.selectedAnswerIndex = null;
        this.isAnswerChecked = false;
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.showResults = true;
        }
    }

    lastQuestion(): void {
        // this.selectedAnswerIndex = null;
        // this.isAnswerChecked = false;
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex--;
        } else {
            this.showResults = true;
        }
    }

    // Reiniciar o quiz
    restartQuiz(): void {
        this.currentQuestionIndex = 0;
        this.selectedAnswerIndex = null;
        this.isAnswerChecked = false;
        this.score = 0;
        this.showResults = false;
    }

    getLetter(index: number): string {
        return String.fromCharCode(65 + index);
    }
}
