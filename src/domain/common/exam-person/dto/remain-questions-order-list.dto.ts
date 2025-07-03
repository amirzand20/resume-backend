
export class RemainQuestionsOrderDto {

  constructor(questionId: number, order: number) {
    this.order = order;
    this.questionId = questionId;
  }

  questionId: number;
  order: number;
}
