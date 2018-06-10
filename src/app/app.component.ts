import { Component ,OnInit } from '@angular/core';
import { Article } from './article.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  article: Article;
  articles: Article[];
  totalPoints;
  ngOnInit(): void {
    this.totalPoints = 0;
    this.calcTotalPoints();
  }
  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1)
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
  voteUp(titleKey): boolean {
    this.article = this.selectArticle(titleKey, this.articles);
    this.article.voteUp();
    this.calcTotalPoints();
    return false;
  }

  voteDown(titleKey): boolean {
    this.article = this.selectArticle(titleKey, this.articles);
    this.article.voteDown();
    this.calcTotalPoints();
    return false;
  }
  selectArticle(titleKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      this.totalPoints = this.totalPoints + Number(myArray[i].votes) * 1;
        if (myArray[i].title === titleKey) {
            return myArray[i];
        }
    }
}
  calcTotalPoints() {
    this.totalPoints = 0;
    for (let i = 0; i < this.articles.length; i++) {
      this.totalPoints = this.totalPoints + this.articles[i].votes * 1;
    }
}
}
